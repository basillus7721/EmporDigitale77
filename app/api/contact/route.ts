import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body: unknown = await request.json();

  if (!body || typeof body !== 'object') {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  const response = await fetch(`${process.env.SUPABASE_URL}/functions/v1/send-contact-email`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.SUPABASE_ANON_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const responseBody = await response.json().catch(() => ({ error: 'Unable to process request.' }));

  return NextResponse.json(responseBody, { status: response.status });
}
