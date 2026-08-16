import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const RECIPIENT = "contact@empor.site";
const SENDER = "Empor Digital <noreply@empor.site>";

const PLAN_LABELS: Record<string, string> = {
  basic: "Basic (₹2,500)",
  premium: "Premium (₹6,400)",
  deluxe: "Deluxe (₹12,000)",
  "discuss-later": "Discuss price later",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const { name, email, idea, plan } = await req.json();

    if (!name || !email || !idea) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const planLabel = PLAN_LABELS[plan] || plan || "Not specified";

    // Store the submission in the database
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const { error: dbError } = await supabase.from("contact_messages").insert({
      name,
      email,
      idea,
      plan: plan || "discuss-later",
    });

    if (dbError) {
      console.error("DB insert failed:", dbError.message);
    }

    // Forward the message to the owner's inbox via Resend
    const resendApiKey = Deno.env.get("RESEND_API_KEY") || "re_PyZC8oZJ_6ZQ2K11a52Bgobcinap1fKn9";

    if (resendApiKey) {
      const html = `
        <div style="font-family: sans-serif; max-width: 560px; margin: auto; padding: 24px;">
          <h2 style="color: #3f7dff;">New project inquiry</h2>
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
          <p><strong>Selected plan:</strong> ${escapeHtml(planLabel)}</p>
          <p><strong>Message:</strong></p>
          <div style="background: #f4f6ff; padding: 16px; border-radius: 12px; white-space: pre-wrap; line-height: 1.6;">${escapeHtml(idea)}</div>
          <p style="color: #9aa6c4; font-size: 12px; margin-top: 24px;">Sent from the Empor Digital contact form.</p>
        </div>
      `;

      const text = `New project inquiry\n\nName: ${name}\nEmail: ${email}\nSelected plan: ${planLabel}\n\nMessage:\n${idea}`;

      const resendRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: SENDER,
          to: [RECIPIENT],
          reply_to: email,
          subject: `New project inquiry from ${name} — ${planLabel}`,
          html,
          text,
        }),
      });

      if (!resendRes.ok) {
        const errBody = await resendRes.text();
        console.error("Resend failed:", errBody);
        return new Response(
          JSON.stringify({ error: "Email delivery failed" }),
          { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
    } else {
      console.warn("RESEND_API_KEY not set — message stored in DB only");
    }

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Function error:", err);
    return new Response(
      JSON.stringify({ error: "Internal error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
