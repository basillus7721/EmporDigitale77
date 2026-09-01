import { Mail, ArrowUp } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useMagneticButton } from '@/hooks/useMagneticButton';

const CONTACT_EMAIL = 'contact@empor.site';

export default function Footer() {
  const sectionRef = useScrollReveal(0.1) as React.RefObject<HTMLElement>;
  const startProjectBtn = useMagneticButton<HTMLAnchorElement>(0.35);

  return (
    <footer
      ref={sectionRef}
      className="relative pt-16 pb-10 px-5 sm:px-8 border-t"
      style={{ borderColor: 'var(--border)' }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          {/* Logo + tagline */}
          <div className="reveal flex flex-col gap-4">
            <a href="#hero" className="flex items-center gap-3 group w-fit">
              <img
                src="/emporlogo.png"
                alt="Empor Digitale Logo"
                className="w-11 h-11 object-contain rounded-lg"
              />
              <span className="font-display font-bold text-base" style={{ color: 'var(--text)' }}>
                <span style={{ color: 'var(--text)' }}>EMPOR </span>
                <span style={{ color: 'var(--brand)' }}>DIGITALE</span>
              </span>
            </a>
            <p className="handwrite text-xl font-bold" style={{ color: 'var(--brand)' }}>
              You dream. We build.
            </p>
            <p className="text-sm max-w-xs" style={{ color: 'var(--text-muted)' }}>
              A high-tech, newly launched agency crafting standout, animated web experiences.
            </p>
          </div>

          {/* Quick links */}
          <div className="reveal flex flex-col gap-3" style={{ transitionDelay: '80ms' }}>
            <p className="text-xs uppercase tracking-wider font-semibold mb-1" style={{ color: 'var(--text-muted)' }}>
              Explore
            </p>
            {[
              { label: 'Services', href: '#services' },
              { label: 'Pricing', href: '#pricing' },
              { label: 'Process', href: '#process' },
              { label: 'Contact', href: '#contact' },
            ].map(l => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm w-fit transition-colors hover:text-brand-blue"
                style={{ color: 'var(--text-muted)' }}
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* Contact */}
          <div className="reveal flex flex-col gap-3" style={{ transitionDelay: '160ms' }}>
            <p className="text-xs uppercase tracking-wider font-semibold mb-1" style={{ color: 'var(--text-muted)' }}>
              Get in touch
            </p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="flex items-center gap-2 text-sm w-fit transition-colors hover:text-brand-blue"
              style={{ color: 'var(--text)' }}
            >
              <Mail size={14} style={{ color: 'var(--brand)' }} /> {CONTACT_EMAIL}
            </a>
            <a
              href="#contact"
              ref={startProjectBtn.ref}
              onMouseMove={startProjectBtn.handleMouseMove}
              onMouseLeave={startProjectBtn.handleMouseLeave}
              className="lift inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold w-fit mt-2"
              style={{ background: 'var(--brand)', color: '#fff' }}
            >
              Start a project →
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="reveal flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t"
          style={{ borderColor: 'var(--border)' }}
        >
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
            © {new Date().getFullYear()} Empor Digitale. All rights reserved. NexFlow.
          </p>
          <a
            href="#hero"
            className="flex items-center gap-1.5 text-xs font-semibold transition-colors hover:text-brand-blue"
            style={{ color: 'var(--text-muted)' }}
          >
            Back to top <ArrowUp size={12} />
          </a>
        </div>
      </div>
    </footer>
  );
}
