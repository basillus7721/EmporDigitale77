import { Check, Star, Zap } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const plans = [
  {
    name: 'Standard',
    price: '7000',
    currency: '₹',
    tagline: 'Responsive website',
    popular: false,
    features: [
      'Up to 4 pages',
      'Responsive design',
      'Basic SEO setup',
      'Contact form',
      '1 round of revisions',
      '5-day delivery',
    ],
  },
  {
    name: 'Premium',
    price: '10000',
    currency: '₹',
    tagline: 'Animated Website',
    popular: true,
    features: [
      'Up to 8 pages',
      'Scroll & hover animations',
      'Advanced SEO',
      'CMS integration',
      '3 rounds of revisions',
      '7-day delivery',
      '30 days support',
    ],
  },
  {
    name: 'Deluxe',
    price: '18000',
    currency: '₹',
    tagline: 'Fully custom, fully animated',
    popular: false,
    features: [
      'Up to 20 pages',
      'Full custom animation suite',
      'Custom development',
      'E-commerce / integrations',
      'Unlimited revisions',
      '14-day delivery',
      '90 days priority support',
    ],
  },
];

export default function Pricing() {
  const sectionRef = useScrollReveal(0.08) as React.RefObject<HTMLElement>;

  const handleChoose = (planName: string) => {
    const key = planName.toLowerCase();
    sessionStorage.setItem('selected-plan', key);
  };

  return (
    <section
      id="pricing"
      ref={sectionRef}
      className="relative py-24 sm:py-32 px-5 sm:px-8"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p
            className="reveal font-body text-xs tracking-widest uppercase font-semibold mb-4"
            style={{ color: 'var(--brand)' }}
          >
            Pricing
          </p>
          <h2
            className="reveal font-display font-black text-3xl sm:text-5xl lg:text-6xl leading-tight"
            style={{ color: 'var(--text)', transitionDelay: '60ms' }}
          >
            Plans That{' '}
            <span className="text-gradient">Scale With You</span>
          </h2>
          <p
            className="reveal max-w-xl mx-auto mt-4 text-base sm:text-lg"
            style={{ color: 'var(--text-muted)', transitionDelay: '120ms' }}
          >
            Transparent pricing. No hidden fees. Pick a plan and we'll handle the rest.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {plans.map((plan, i) => (
            <div
              key={plan.name}
              className={`reveal lift relative rounded-2xl p-8 flex flex-col ${
                plan.popular ? 'animate-pulseGlow' : ''
              }`}
              style={{
                transitionDelay: `${i * 80}ms`,
                background: plan.popular
                  ? 'linear-gradient(160deg, rgba(63,125,255,0.16), rgba(199,215,255,0.06))'
                  : 'var(--bg-card)',
                border: plan.popular
                  ? '1px solid rgba(63,125,255,0.5)'
                  : '1px solid var(--border)',
                backdropFilter: 'blur(14px)',
                WebkitBackdropFilter: 'blur(14px)',
              }}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
                  style={{ background: 'var(--brand)', color: '#fff' }}
                >
                  <Star size={12} fill="#fff" /> Most Popular
                </div>
              )}

              <div className="flex items-center justify-between mb-1">
                <h3 className="font-display font-bold text-xl" style={{ color: 'var(--text)' }}>
                  {plan.name}
                </h3>
                {plan.popular && <Zap size={18} style={{ color: 'var(--brand)' }} />}
              </div>
              <p className="text-sm mb-5" style={{ color: 'var(--text-muted)' }}>
                {plan.tagline}
              </p>

              <div className="flex items-baseline gap-1 mb-6">
                <span className="font-display font-black text-2xl" style={{ color: 'var(--brand)' }}>
                  {plan.currency}
                </span>
                <span className="font-display font-black text-5xl" style={{ color: 'var(--text)' }}>
                  {plan.price}
                </span>
              </div>

              <ul className="flex flex-col gap-3 mb-8 flex-1">
                {plan.features.map(f => (
                  <li key={f} className="flex items-start gap-2.5 text-sm" style={{ color: 'var(--text-muted)' }}>
                    <span
                      className="mt-0.5 w-4 h-4 rounded-full flex items-center justify-center shrink-0"
                      style={{ background: 'rgba(63,125,255,0.15)' }}
                    >
                      <Check size={10} style={{ color: 'var(--brand)' }} strokeWidth={3} />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                onClick={() => handleChoose(plan.name)}
                className="lift flex items-center justify-center px-5 py-3 rounded-full font-semibold text-sm transition-all duration-300"
                style={{
                  background: plan.popular ? 'var(--brand)' : 'transparent',
                  color: plan.popular ? '#fff' : 'var(--text)',
                  border: plan.popular ? 'none' : '1px solid var(--border)',
                }}
              >
                Choose {plan.name}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
