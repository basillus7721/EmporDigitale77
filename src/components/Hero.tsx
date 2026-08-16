import { useState, useEffect } from 'react';
import { ArrowRight, PlayCircle, ArrowUp } from 'lucide-react';
import { useCounter } from '@/hooks/useCounter';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useMagneticButton } from '@/hooks/useMagneticButton';

type Stat = {
  label: string;
  value: number;
  suffix: string;
  prefix: string;
};

const stats: Stat[] = [
  { label: 'Websites Built Every Year', value: 70, suffix: '+', prefix: '' },
  { label: '5-Star Rating', value: 94, suffix: '%', prefix: '' },
  { label: 'Working Days (Premium)', value: 7, suffix: '', prefix: '≤' },
];

function StatCounter({ stat }: { stat: Stat }) {
  const { count, ref } = useCounter(stat.value, 2200);

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className="flex flex-col items-center sm:items-start"
    >
      <span
        className="font-display font-black text-4xl sm:text-5xl leading-none"
        style={{ color: 'var(--brand)' }}
      >
        {stat.prefix}
        {count}
        <span style={{ color: 'var(--lavender)' }}>{stat.suffix}</span>
      </span>
      <span className="text-sm font-medium mt-2 text-center sm:text-left" style={{ color: 'var(--text-muted)' }}>
        {stat.label}
      </span>
    </div>
  );
}

function SideArrows({ active }: { active: boolean }) {
  const arrows = [
    { x: -14, size: 52, delay: 0,    dur: 1.4 },
    { x: 10,  size: 44, delay: 0.3,  dur: 1.1 },
    { x: -6,  size: 60, delay: 0.6,  dur: 1.6 },
    { x: 16,  size: 38, delay: 0.15, dur: 0.95 },
    { x: -20, size: 48, delay: 0.45, dur: 1.25 },
    { x: 4,   size: 56, delay: 0.75, dur: 1.5 },
    { x: 22,  size: 40, delay: 0.2,  dur: 1.05 },
    { x: -12, size: 50, delay: 0.55, dur: 1.35 },
  ];
  return (
    <div
      className="relative flex items-center justify-center transition-opacity duration-700"
      style={{ opacity: active ? 1 : 0, pointerEvents: 'none', width: 70 }}
      aria-hidden
    >
      {arrows.map((a, i) => (
        <ArrowUp
          key={i}
          size={a.size}
          strokeWidth={2.5}
          style={{
            position: 'absolute',
            left: '50%',
            marginLeft: a.x - a.size / 2,
            color: '#2f7dff',
            animation: active
              ? `arrowRise ${a.dur}s ease-in-out ${a.delay}s infinite`
              : 'none',
            filter:
              'drop-shadow(0 0 8px rgba(47,125,255,1)) drop-shadow(0 0 18px rgba(47,125,255,0.7)) drop-shadow(0 0 30px rgba(47,125,255,0.4))',
            opacity: 0,
          }}
        />
      ))}
    </div>
  );
}

export default function Hero() {
  const sectionRef = useScrollReveal(0.1) as React.RefObject<HTMLElement>;
  const startBtn = useMagneticButton<HTMLAnchorElement>(0.3);
  const seeWorkBtn = useMagneticButton<HTMLAnchorElement>(0.3);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center text-center pt-24 pb-20 px-5 sm:px-8 overflow-hidden"
    >
      {/* Radial glow behind hero */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(63,125,255,0.13) 0%, transparent 70%)',
        }}
      />

      {/* Badge */}
      <div className="reveal flex items-center gap-2 mb-6">
        <span
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase"
          style={{
            background: 'rgba(63,125,255,0.12)',
            color: 'var(--brand)',
            border: '1px solid rgba(63,125,255,0.28)',
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full animate-pulse"
            style={{ background: 'var(--brand)' }}
          />
          Website-Building Agency
        </span>
      </div>

      {/* Headline */}
      <h1
        className="reveal font-display font-black text-4xl sm:text-6xl lg:text-7xl xl:text-8xl leading-[1.05] max-w-5xl mx-auto"
        style={{ color: 'var(--text)' }}
      >
        We Build Websites{' '}
        <span className="text-gradient animate-shimmer">
          That Stand Out
        </span>
        <br />
        <span className="text-gradient animate-shimmer">
          &amp; Move.
        </span>
      </h1>

      {/* Subtext */}
      <p
        className="reveal font-body text-base sm:text-xl mt-6 max-w-2xl mx-auto leading-relaxed"
        style={{ color: 'var(--text-muted)', transitionDelay: '100ms' }}
      >
        From slick brochure sites to fully animated digital experiences — we craft web presences
        that convert visitors into believers, and ideas into impact.
      </p>

      {/* CTAs */}
      <div
        className="reveal flex flex-col sm:flex-row items-center gap-4 mt-10"
        style={{ transitionDelay: '180ms' }}
      >
        <a
          href="#contact"
          ref={startBtn.ref}
          onMouseMove={startBtn.handleMouseMove}
          onMouseLeave={startBtn.handleMouseLeave}
          className="lift flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-base transition-all duration-300"
          style={{ background: 'var(--brand)', color: '#fff' }}
        >
          Start Your Project <ArrowRight size={18} />
        </a>
        <a
          href="#services"
          ref={seeWorkBtn.ref}
          onMouseMove={seeWorkBtn.handleMouseMove}
          onMouseLeave={seeWorkBtn.handleMouseLeave}
          className="lift flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-base glass"
          style={{ color: 'var(--text)', border: '1px solid var(--border)' }}
        >
          <PlayCircle size={18} style={{ color: 'var(--brand)' }} /> See Our Work
        </a>
      </div>

      {/* Stats with side arrows */}
      <div
        className="reveal mt-20 w-full max-w-3xl mx-auto"
        style={{ transitionDelay: '260ms' }}
      >
        <div className="flex items-stretch gap-3 sm:gap-5">
          <SideArrows active={true} />
          <div
            className="glass rounded-2xl px-8 py-8 grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-0 divide-y sm:divide-y-0 sm:divide-x flex-1"
            style={{ borderColor: 'var(--border)' }}
          >
            {stats.map(s => (
              <div key={s.label} className="flex justify-center sm:px-8">
                <StatCounter stat={s} />
              </div>
            ))}
          </div>
          <SideArrows active={true} />
        </div>
      </div>

      {/* Scroll hint */}
      <div
        className="reveal absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ transitionDelay: '400ms' }}
      >
        <span className="text-xs tracking-widest uppercase" style={{ color: 'var(--text-muted)' }}>
          Scroll
        </span>
        <div
          className="w-px h-10 animate-pulse"
          style={{ background: 'linear-gradient(to bottom, var(--brand), transparent)' }}
        />
      </div>

      <style>{`
        @keyframes arrowRise {
          0%   { transform: translate(0, 40px); opacity: 0; }
          20%  { opacity: 1; }
          80%  { opacity: 0.8; }
          100% { transform: translate(0, -50px); opacity: 0; }
        }
      `}</style>
    </section>
  );
}
