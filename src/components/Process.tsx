import { Search, PenTool, Code, Rocket } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const steps = [
  {
    icon: Search,
    title: 'Discover',
    desc: 'We dig into your brand, goals, and audience to map out what success looks like for you.',
  },
  {
    icon: PenTool,
    title: 'Design',
    desc: 'Wireframes, mockups, and motion concepts — refined together until you love it.',
  },
  {
    icon: Code,
    title: 'Build',
    desc: 'We turn designs into clean, fast, animated code with rigorous testing along the way.',
  },
  {
    icon: Rocket,
    title: 'Launch',
    desc: 'We ship, monitor, and support — your site goes live and we stay right beside you.',
  },
];

export default function Process() {
  const sectionRef = useScrollReveal(0.08) as React.RefObject<HTMLElement>;

  return (
    <section
      id="process"
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
            How We Work
          </p>
          <h2
            className="reveal font-display font-black text-3xl sm:text-5xl lg:text-6xl leading-tight"
            style={{ color: 'var(--text)', transitionDelay: '60ms' }}
          >
            A Simple{' '}
            <span className="text-gradient">4-Step Process</span>
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Connecting line (desktop) */}
          <div
            className="hidden lg:block absolute top-12 left-0 right-0 h-px"
            style={{
              background:
                'linear-gradient(to right, transparent, var(--brand), var(--lavender), var(--brand), transparent)',
            }}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-6">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.title}
                  className="reveal relative flex flex-col items-center text-center"
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  {/* Numbered node */}
                  <div className="relative mb-6">
                    <div
                      className="w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                      style={{
                        background: 'var(--bg-card)',
                        border: '1px solid var(--border)',
                        backdropFilter: 'blur(14px)',
                        WebkitBackdropFilter: 'blur(14px)',
                      }}
                    >
                      <Icon size={28} style={{ color: 'var(--brand)' }} />
                    </div>
                    <span
                      className="absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center font-display font-bold text-xs"
                      style={{ background: 'var(--brand)', color: '#fff' }}
                    >
                      {i + 1}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-lg mb-2" style={{ color: 'var(--text)' }}>
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed max-w-xs" style={{ color: 'var(--text-muted)' }}>
                    {step.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
