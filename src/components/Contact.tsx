import { useEffect, useState, FormEvent } from 'react';
import { Mail, Send, User, MessageSquare, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const CONTACT_EMAIL = 'contact@empor.site';

type PlanChoice = 'standard' | 'premium' | 'deluxe' | 'discuss-later';
type Status = 'idle' | 'sending' | 'success' | 'error';

const PLAN_OPTIONS: { value: PlanChoice; label: string; price: string }[] = [
  { value: 'standard', label: 'Standard', price: '₹7,000' },
  { value: 'premium', label: 'Premium', price: '₹10,000' },
  { value: 'deluxe', label: 'Deluxe', price: '₹18,000' },
  { value: 'discuss-later', label: 'Discuss price later', price: '' },
];

export default function Contact() {
  const sectionRef = useScrollReveal(0.08) as React.RefObject<HTMLElement>;
  const [status, setStatus] = useState<Status>('idle');
  const [form, setForm] = useState({
    name: '',
    email: '',
    idea: '',
    plan: 'discuss-later' as PlanChoice,
  });

  useEffect(() => {
    const saved = sessionStorage.getItem('selected-plan');
    if (saved === 'standard' || saved === 'premium' || saved === 'deluxe') {
      sessionStorage.removeItem('selected-plan');
      setForm(current => ({ ...current, plan: saved }));
    }
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus('sending');
    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
      const res = await fetch(`${supabaseUrl}/functions/v1/send-contact-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${supabaseKey}`,
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          idea: form.idea,
          plan: form.plan,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data && data.error) {
          setStatus('error');
        } else {
          setStatus('success');
          setForm({ name: '', email: '', idea: '', plan: 'discuss-later' });
        }
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  const inputBase =
    'w-full px-4 py-3 rounded-xl text-sm transition-all duration-200 focus:outline-none focus:ring-2';
  const inputStyle = {
    background: 'var(--bg-card)',
    border: '1px solid var(--border)',
    color: 'var(--text)',
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-24 sm:py-32 px-5 sm:px-8"
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p
            className="reveal font-body text-xs tracking-widest uppercase font-semibold mb-4"
            style={{ color: 'var(--brand)' }}
          >
            Let's Talk
          </p>
          <h2
            className="reveal font-display font-black text-3xl sm:text-5xl lg:text-6xl leading-tight"
            style={{ color: 'var(--text)', transitionDelay: '60ms' }}
          >
            Tell Us Your{' '}
            <span className="text-gradient">Idea</span>
          </h2>
          <p
            className="reveal max-w-xl mx-auto mt-4 text-base sm:text-lg"
            style={{ color: 'var(--text-muted)', transitionDelay: '120ms' }}
          >
            Share what you're dreaming up. We'll get back to you within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          {/* Left: contact info */}
          <div className="reveal lg:col-span-2 flex flex-col gap-5">
            <div className="glass rounded-2xl p-6 lift">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                style={{ background: 'rgba(63,125,255,0.12)' }}
              >
                <Mail size={20} style={{ color: 'var(--brand)' }} />
              </div>
              <p className="text-xs uppercase tracking-wider mb-1" style={{ color: 'var(--text-muted)' }}>
                Email us directly
              </p>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="font-semibold text-sm break-all transition-colors hover:text-brand-blue"
                style={{ color: 'var(--text)' }}
              >
                {CONTACT_EMAIL}
              </a>
            </div>

            <div className="glass rounded-2xl p-6">
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                Prefer email? Reach out anytime — we usually reply within a day. Or drop your idea
                in the form and we'll come to you.
              </p>
            </div>
          </div>

          {/* Right: form */}
          <div className="reveal lg:col-span-3 glass rounded-2xl p-7 sm:p-8" style={{ transitionDelay: '120ms' }}>
            {status === 'success' ? (
              <div className="flex flex-col items-center justify-center text-center py-10 gap-4">
                <CheckCircle2 size={48} style={{ color: 'var(--brand)' }} />
                <h3 className="font-display font-bold text-xl" style={{ color: 'var(--text)' }}>
                  Idea sent!
                </h3>
                <p className="text-sm max-w-sm" style={{ color: 'var(--text-muted)' }}>
                  Thanks for sharing your dream. We'll be in touch very soon.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-2 text-sm font-semibold transition-colors hover:text-brand-blue"
                  style={{ color: 'var(--brand)' }}
                >
                  Send another →
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5" style={{ color: 'var(--text-muted)' }}>
                    <User size={12} /> Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    placeholder="Jane Doe"
                    className={inputBase}
                    style={inputStyle}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5" style={{ color: 'var(--text-muted)' }}>
                    <Mail size={12} /> Email
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    placeholder="jane@example.com"
                    className={inputBase}
                    style={inputStyle}
                  />
                </div>

                {/* Plan selector */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5" style={{ color: 'var(--text-muted)' }}>
                    <Sparkles size={12} /> Choose a Plan
                  </label>
                  <div className="grid grid-cols-2 gap-2.5">
                    {PLAN_OPTIONS.map(opt => {
                      const active = form.plan === opt.value;
                      return (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => setForm({ ...form, plan: opt.value })}
                          className="relative px-4 py-3 rounded-xl text-left transition-all duration-200"
                          style={{
                            background: active ? 'rgba(63,125,255,0.14)' : 'var(--bg-card)',
                            border: active
                              ? '1px solid rgba(63,125,255,0.6)'
                              : '1px solid var(--border)',
                            boxShadow: active ? '0 0 18px -6px rgba(63,125,255,0.5)' : 'none',
                          }}
                        >
                          <div className="flex items-center gap-2">
                            <span
              className="w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all"
              style={{
                borderColor: active ? 'var(--brand)' : 'var(--border)',
                background: active ? 'var(--brand)' : 'transparent',
              }}
            >
              {active && (
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: '#fff' }}
                />
              )}
            </span>
                            <span
                              className="text-sm font-semibold"
                              style={{ color: active ? 'var(--text)' : 'var(--text-muted)' }}
                            >
                              {opt.label}
                            </span>
                          </div>
                          {opt.price && (
                            <span
                              className="block text-xs mt-0.5 ml-5.5"
                              style={{ color: active ? 'var(--brand)' : 'var(--text-muted)' }}
                            >
                              {opt.price}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5" style={{ color: 'var(--text-muted)' }}>
                    <MessageSquare size={12} /> Your Website Idea
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={form.idea}
                    onChange={e => setForm({ ...form, idea: e.target.value })}
                    placeholder="Tell us what you're dreaming up — what kind of site, who it's for, what it should do..."
                    className={`${inputBase} resize-none`}
                    style={inputStyle}
                  />
                </div>

                {status === 'error' && (
                  <div className="flex items-center gap-2 text-sm px-4 py-3 rounded-xl"
                    style={{ background: 'rgba(239,68,68,0.1)', color: '#ef4444' }}
                  >
                    <AlertCircle size={16} /> Something went wrong. Please email us directly at {CONTACT_EMAIL}.
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="lift flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{ background: 'var(--brand)', color: '#fff' }}
                >
                  {status === 'sending' ? (
                    <>Sending...</>
                  ) : (
                    <>
                      Send Your Idea <Send size={16} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
