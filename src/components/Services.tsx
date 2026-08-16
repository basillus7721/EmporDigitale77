import { Monitor, Sparkles, ShoppingBag, Search, Code2, HeartHandshake } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const cards = [
  {
    icon: Monitor,
    title: 'Website Design',
    desc: 'Pixel-perfect layouts crafted to represent your brand, built for every screen and every visitor.',
    color: '#3f7dff',
  },
  {
    icon: Sparkles,
    title: 'Animated Experiences',
    desc: 'Scroll effects, micro-interactions, and motion design that make your site unforgettable.',
    color: '#c7d7ff',
  },
  {
    icon: ShoppingBag,
    title: 'E-commerce Stores',
    desc: 'Full-featured online stores with smooth checkout flows, product management, and conversion focus.',
    color: '#3f7dff',
  },
  {
    icon: Search,
    title: 'SEO Foundations',
    desc: 'Technical SEO, fast load times, and semantic structure so Google loves you from day one.',
    color: '#c7d7ff',
  },
  {
    icon: Code2,
    title: 'Custom Development',
    desc: 'Bespoke features, integrations, and web applications built from scratch to your exact spec.',
    color: '#3f7dff',
  },
  {
    icon: HeartHandshake,
    title: 'Care & Support',
    desc: 'Ongoing updates, performance monitoring, and priority support — we stay with you long-term.',
    color: '#c7d7ff',
  },
];

export default function Services() {
  const sectionRef = useScrollReveal(0.08) as React.RefObject<HTMLElement>;

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative py-24 sm:py-32 px-5 sm:px-8 overflow-hidden"
    >
      {/* Watermark logo */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
        <img
          src="/emporlogo.png"
          alt=""
          aria-hidden
          className="w-[520px] h-[520px] object-contain opacity-[0.04]"
          style={{ filter: 'saturate(0) contrast(1.5)' }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p
            className="reveal font-body text-xs tracking-widest uppercase font-semibold mb-4"
            style={{ color: 'var(--brand)' }}
          >
            What We Do
          </p>
          <h2
            className="reveal font-display font-black text-3xl sm:text-5xl lg:text-6xl leading-tight"
            style={{ color: 'var(--text)', transitionDelay: '60ms' }}
          >
            Services That{' '}
            <span className="text-gradient">Elevate</span>
          </h2>
          <p
            className="reveal max-w-xl mx-auto mt-4 text-base sm:text-lg"
            style={{ color: 'var(--text-muted)', transitionDelay: '120ms' }}
          >
            Everything you need to launch, grow, and maintain a standout web presence — under one roof.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, i) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                className="reveal lift glass rounded-2xl p-7 flex flex-col gap-4 cursor-default group"
                style={{
                  transitionDelay: `${i * 60}ms`,
                  border: '1px solid var(--border)',
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                  style={{
                    background: `rgba(${card.color === '#3f7dff' ? '63,125,255' : '199,215,255'},0.12)`,
                    border: `1px solid rgba(${card.color === '#3f7dff' ? '63,125,255' : '199,215,255'},0.25)`,
                  }}
                >
                  <Icon size={22} style={{ color: card.color }} />
                </div>
                <h3
                  className="font-display font-bold text-lg leading-tight"
                  style={{ color: 'var(--text)' }}
                >
                  {card.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                  {card.desc}
                </p>
                <div
                  className="mt-auto pt-2 flex items-center gap-1 text-xs font-semibold transition-all duration-300 opacity-0 group-hover:opacity-100 translate-x-[-4px] group-hover:translate-x-0"
                  style={{ color: 'var(--brand)' }}
                >
                  Learn more →
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
