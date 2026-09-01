import { useState, useEffect } from 'react';
import { Moon, Sun, ArrowRight, Menu, X } from 'lucide-react';
import { useMagneticButton } from '@/hooks/useMagneticButton';

interface NavProps {
  theme: string;
  toggleTheme: () => void;
}

export default function Nav({ theme, toggleTheme }: NavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const startProjectBtn = useMagneticButton<HTMLAnchorElement>(0.4);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { label: 'Services', href: '#services' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Process', href: '#process' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled
          ? 'var(--nav-bg)'
          : 'transparent',
        backdropFilter: scrolled ? 'blur(18px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(18px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
      }}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 sm:h-20 flex items-center justify-between">
        {/* Logo + wordmark */}
        <a
          href="#hero"
          className="relative flex items-center gap-3 group select-none"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <div className="relative w-10 h-10 sm:w-12 sm:h-12 shrink-0">
            <img
              src="/emporlogo.png"
              alt="Empor Digitale Logo"
              className="w-full h-full object-contain rounded-lg"
            />
          </div>
          <div className="flex flex-col justify-center leading-none">
            <span
              className="font-display font-bold tracking-tight text-base sm:text-lg"
              style={{ color: 'var(--text)' }}
            >
              <span style={{ color: 'var(--text)' }}>EMPOR </span>
              <span style={{ color: 'var(--brand)' }}>DIGITALE</span>
            </span>
            {/* Animated handwritten tagline */}
            <span
              className="handwrite text-sm font-semibold overflow-hidden transition-all duration-500 ease-in-out whitespace-nowrap"
              style={{
                color: 'var(--brand)',
                maxHeight: hovered ? '22px' : '0px',
                opacity: hovered ? 1 : 0,
                transform: hovered ? 'translateY(0)' : 'translateY(-6px)',
              }}
            >
              You dream. We build.
            </span>
          </div>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium transition-colors duration-200 hover:text-brand-blue"
              style={{ color: 'var(--text-muted)', fontFamily: 'Manrope, sans-serif' }}
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 glass"
            style={{ border: '1px solid var(--border)' }}
          >
            {theme === 'dark' ? (
              <Sun size={16} style={{ color: 'var(--lavender)' }} />
            ) : (
              <Moon size={16} style={{ color: 'var(--brand)' }} />
            )}
          </button>

          {/* Start a project button */}
          <a
            href="#contact"
            ref={startProjectBtn.ref}
            onMouseMove={startProjectBtn.handleMouseMove}
            onMouseLeave={startProjectBtn.handleMouseLeave}
            className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 hover:shadow-glow"
            style={{
              background: 'var(--brand)',
              color: '#fff',
              fontFamily: 'Manrope, sans-serif',
            }}
          >
            Start a project <ArrowRight size={14} />
          </a>

          {/* Mobile hamburger */}
          <button
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg glass"
            style={{ border: '1px solid var(--border)' }}
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={18} style={{ color: 'var(--text)' }} /> : <Menu size={18} style={{ color: 'var(--text)' }} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className="md:hidden overflow-hidden transition-all duration-400"
        style={{
          maxHeight: menuOpen ? '320px' : '0',
          background: 'var(--nav-bg)',
          backdropFilter: 'blur(18px)',
          WebkitBackdropFilter: 'blur(18px)',
        }}
      >
        <div className="px-5 pb-6 pt-2 flex flex-col gap-4">
          {links.map(l => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="text-base font-medium py-2 border-b transition-colors hover:text-brand-blue"
              style={{ color: 'var(--text-muted)', borderColor: 'var(--border)' }}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="flex items-center justify-center gap-2 px-4 py-3 rounded-full text-sm font-semibold mt-1"
            style={{ background: 'var(--brand)', color: '#fff' }}
          >
            Start a project <ArrowRight size={14} />
          </a>
        </div>
      </div>
    </nav>
  );
}
