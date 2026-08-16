import { useState, useEffect } from 'react';

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    const saved = localStorage.getItem('ed-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initial: 'dark' | 'light' = saved === 'light' || saved === 'dark' ? saved : prefersDark ? 'dark' : 'light';
    setTheme(initial);
    document.documentElement.setAttribute('data-theme', initial);
  }, []);

  useEffect(() => {
    let raf: number;
    const start = performance.now();
    const duration = 1100;

    const tick = (now: number) => {
      const elapsed = now - start;
      const pct = Math.min(100, (elapsed / duration) * 100);
      setProgress(pct);
      if (pct < 100) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(() => setDone(true), 350);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  if (done) return null;

  const bg = theme === 'dark' ? '#08080b' : '#f4f6ff';

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
      style={{
        background: bg,
        transition: 'opacity 0.35s ease, visibility 0.35s ease',
        opacity: progress >= 100 ? 0 : 1,
      }}
    >
      {/* Logo */}
      <div
        className="flex flex-col items-center gap-4"
        style={{
          transform: `scale(${0.92 + (progress / 100) * 0.08})`,
          transition: 'transform 0.3s ease',
        }}
      >
        <img
          src="/emporlogo.png"
          alt="Empor Digitale"
          className="w-16 h-16 sm:w-20 sm:h-20 object-contain rounded-xl"
        />
        <p
          className="handwrite text-2xl sm:text-3xl font-bold"
          style={{ color: 'var(--brand)' }}
        >
          You dream. We build.
        </p>
      </div>

      {/* Loading bar */}
      <div
        className="mt-8 h-1 rounded-full overflow-hidden"
        style={{
          width: '180px',
          background: theme === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
        }}
      >
        <div
          className="h-full rounded-full"
          style={{
            width: `${progress}%`,
            background: 'var(--brand)',
            transition: 'width 0.05s linear',
          }}
        />
      </div>
    </div>
  );
}
