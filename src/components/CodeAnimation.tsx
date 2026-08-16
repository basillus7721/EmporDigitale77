import { useEffect, useRef, useState, useCallback } from 'react';

const CODE_SNIPPETS = [
  '<div>', '</div>', 'const', 'function()', 'return', '</>',
  'useState()', '.map()', 'async', 'await', '{...props}',
  'className=', 'style={{}}', 'import', 'export', '<span>',
  'onClick={', 'useEffect', 'transform:', 'animation:', 'opacity:',
  'border-radius', 'flex', 'grid', 'position:', 'absolute',
];

const WINDOW_CODE: string[][] = [
  [
    'import { motion } from "framer"',
    '',
    'export default function Hero() {',
    '  return (',
    '    <motion.div',
    '      initial={{ opacity: 0 }}',
    '      animate={{ opacity: 1 }}',
    '      transition={{ duration: 0.8 }}',
    '    >',
    '      <h1>You dream.</h1>',
    '    </motion.div>',
    '  )',
    '}',
  ],
  [
    '.glass {',
    '  backdrop-filter: blur(14px);',
    '  background: rgba(255,255,255,0.04);',
    '  border: 1px solid var(--border);',
    '  border-radius: 16px;',
    '}',
    '',
    '@keyframes floaty {',
    '  0%,100% { transform: translateY(0); }',
    '  50% { transform: translateY(-10px); }',
    '}',
  ],
  [
    'const stats = [',
    '  { label: "Websites", value: 400 },',
    '  { label: "Customers", value: 200 },',
    '  { label: "Years", value: 12 },',
    '];',
    '',
    'stats.map(s => (',
    '  <Counter {...s} />',
    '));',
  ],
  [
    'useEffect(() => {',
    '  const obs = new',
    '    IntersectionObserver(',
    '      ([e]) => {',
    '        if (e.isIntersecting)',
    '          setVisible(true);',
    '      },',
    '      { threshold: 0.15 }',
    '    );',
    '  obs.observe(ref.current);',
    '}, []);',
  ],
];

interface Particle {
  id: number;
  text: string;
  x: number;
  y: number;
  speed: number;
  opacity: number;
  fontSize: number;
  shattered: boolean;
  sxOff: number;
  syOff: number;
}

type Phase = 'falling' | 'shattering' | 'revealing' | 'done';

interface CodeWindow {
  id: number;
  code: string[];
  x: number;
  y: number;
  floatPhase: number;
  floatAmp: number;
  floatSpeed: number;
}

interface DragState {
  id: number;
  pointerOffsetX: number;
  pointerOffsetY: number;
  lastX: number;
  lastY: number;
}

interface TrailSeg {
  id: number;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  opacity: number;
}

export default function CodeAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<Phase>('falling');
  const [particles, setParticles] = useState<Particle[]>([]);
  const [showText, setShowText] = useState(false);
  const [showWindows, setShowWindows] = useState(false);
  const [wavePhase, setWavePhase] = useState(0);
  const [windows, setWindows] = useState<CodeWindow[]>([]);
  const [drag, setDrag] = useState<DragState | null>(null);
  const [trail, setTrail] = useState<TrailSeg[]>([]);
  const trailIdRef = useRef(0);
  const rafRef = useRef<number>(0);
  const startedRef = useRef(false);
  const tickRef = useRef(0);

  // Trigger when section enters viewport
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !startedRef.current) {
          startedRef.current = true;
          startSequence();
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Wave animation
  useEffect(() => {
    const animate = () => {
      setWavePhase(p => p + 0.025);
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  function startSequence() {
    const count = 28;
    const initial: Particle[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      text: CODE_SNIPPETS[i % CODE_SNIPPETS.length],
      x: 5 + Math.random() * 90,
      y: -10 - Math.random() * 60,
      speed: 0.18 + Math.random() * 0.22,
      opacity: 0.7 + Math.random() * 0.3,
      fontSize: 11 + Math.floor(Math.random() * 12),
      shattered: false,
      sxOff: 0,
      syOff: 0,
    }));
    setParticles(initial);
    setPhase('falling');

    setTimeout(() => setPhase('shattering'), 2200);
    setTimeout(() => {
      setParticles(prev =>
        prev.map(p => ({
          ...p,
          shattered: true,
          sxOff: (Math.random() - 0.5) * 260,
          syOff: (Math.random() - 0.5) * 160,
          opacity: 0,
        }))
      );
    }, 2400);
    setTimeout(() => {
      setShowText(true);
      setPhase('revealing');
      // Spawn draggable windows after slogan appears
      setTimeout(() => {
        const wins: CodeWindow[] = [
          {
            id: 0,
            code: WINDOW_CODE[0],
            x: 4,
            y: 30,
            floatPhase: 0,
            floatAmp: 8,
            floatSpeed: 0.018,
          },
          {
            id: 1,
            code: WINDOW_CODE[1],
            x: 76,
            y: 22,
            floatPhase: 1.5,
            floatAmp: 6,
            floatSpeed: 0.022,
          },
          {
            id: 2,
            code: WINDOW_CODE[2],
            x: 70,
            y: 58,
            floatPhase: 3,
            floatAmp: 10,
            floatSpeed: 0.015,
          },
          {
            id: 3,
            code: WINDOW_CODE[3],
            x: 8,
            y: 62,
            floatPhase: 4.5,
            floatAmp: 7,
            floatSpeed: 0.02,
          },
        ];
        setWindows(wins);
        setShowWindows(true);
      }, 600);
    }, 3000);
    setTimeout(() => setPhase('done'), 5000);
  }

  // Tick particles downward
  useEffect(() => {
    if (phase !== 'falling') return;
    const id = setInterval(() => {
      setParticles(prev =>
        prev.map(p => ({
          ...p,
          y: p.y + p.speed * 3,
        }))
      );
      tickRef.current++;
    }, 16);
    return () => clearInterval(id);
  }, [phase]);

  // Float animation for windows
  useEffect(() => {
    if (!showWindows) return;
    const id = setInterval(() => {
      setWindows(prev =>
        prev.map(w => ({ ...w, floatPhase: w.floatPhase + w.floatSpeed }))
      );
    }, 32);
    return () => clearInterval(id);
  }, [showWindows]);

  // Drag handling
  const onPointerDown = useCallback(
    (e: React.PointerEvent, id: number) => {
      e.preventDefault();
      e.stopPropagation();
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const win = windows.find(w => w.id === id);
      if (!win) return;
      const winLeft = (win.x / 100) * rect.width;
      const winTop = (win.y / 100) * rect.height;
      setDrag({
        id,
        pointerOffsetX: e.clientX - rect.left - winLeft,
        pointerOffsetY: e.clientY - rect.top - winTop,
        lastX: e.clientX - rect.left,
        lastY: e.clientY - rect.top,
      });
      setTrail([]);
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    },
    [windows]
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!drag) return;
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const winWidth = 200;
      const winHeight = 180;
      const curX = e.clientX - rect.left;
      const curY = e.clientY - rect.top;
      // Add trail segment
      const segId = trailIdRef.current++;
      setTrail(prev => [
        ...prev,
        {
          id: segId,
          x1: drag.lastX,
          y1: drag.lastY,
          x2: curX,
          y2: curY,
          opacity: 0.85,
        },
      ]);
      let newLeft = curX - drag.pointerOffsetX;
      let newTop = curY - drag.pointerOffsetY;
      // Constrain within container
      newLeft = Math.max(0, Math.min(rect.width - winWidth, newLeft));
      newTop = Math.max(0, Math.min(rect.height - winHeight, newTop));
      const xPct = (newLeft / rect.width) * 100;
      const yPct = (newTop / rect.height) * 100;
      setWindows(prev =>
        prev.map(w => (w.id === drag.id ? { ...w, x: xPct, y: yPct } : w))
      );
      setDrag(d => (d ? { ...d, lastX: curX, lastY: curY } : d));
    },
    [drag]
  );

  const onPointerUp = useCallback(() => {
    setDrag(null);
  }, []);

  // Fade trail segments
  useEffect(() => {
    if (trail.length === 0) return;
    const id = setInterval(() => {
      setTrail(prev => {
        const next = prev
          .map(s => ({ ...s, opacity: s.opacity - 0.035 }))
          .filter(s => s.opacity > 0);
        return next;
      });
    }, 32);
    return () => clearInterval(id);
  }, [trail.length === 0]);

  const wavePoints = (amplitude: number, freq: number, offset: number) => {
    const pts: string[] = [];
    for (let x = 0; x <= 100; x += 2) {
      const y = 50 + amplitude * Math.sin((x / 100) * freq * Math.PI * 2 + wavePhase + offset);
      pts.push(`${x},${y}`);
    }
    return pts.join(' ');
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden select-none"
      style={{ height: '440px' }}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
    >
      {/* Wave SVGs */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <polyline
          points={wavePoints(8, 1.6, 0)}
          fill="none"
          stroke="rgba(63,125,255,0.18)"
          strokeWidth="0.5"
        />
        <polyline
          points={wavePoints(5, 2.2, 1)}
          fill="none"
          stroke="rgba(199,215,255,0.14)"
          strokeWidth="0.35"
        />
        <polyline
          points={wavePoints(11, 1.1, 2)}
          fill="none"
          stroke="rgba(63,125,255,0.1)"
          strokeWidth="0.6"
        />
      </svg>

      {/* Drag trail (yellow, fades) */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 15 }}>
        {trail.map(seg => (
          <line
            key={seg.id}
            x1={seg.x1}
            y1={seg.y1}
            x2={seg.x2}
            y2={seg.y2}
            stroke="rgba(255,210,40,1)"
            strokeWidth={2.5}
            strokeLinecap="round"
            opacity={seg.opacity}
            style={{
              filter: `drop-shadow(0 0 6px rgba(255,210,40,${seg.opacity * 0.8}))`,
              transition: 'opacity 0.3s linear',
            }}
          />
        ))}
      </svg>

      {/* Falling / shattering code */}
      {particles.map(p => (
        <span
          key={p.id}
          className="absolute font-mono select-none pointer-events-none transition-all"
          style={{
            left: `${p.x}%`,
            top: p.shattered ? `${p.y + p.syOff}px` : `${p.y}%`,
            transform: `translateX(${p.shattered ? p.sxOff : 0}px)`,
            opacity: p.shattered ? 0 : p.opacity,
            fontSize: `${p.fontSize}px`,
            color: '#3f7dff',
            textShadow: '0 0 14px rgba(63,125,255,0.8)',
            transition: p.shattered ? 'all 0.55s ease-out' : 'none',
          }}
        >
          {p.text}
        </span>
      ))}

      {/* Draggable floating code windows */}
      {showWindows &&
        windows.map(w => {
          const floatY = Math.sin(w.floatPhase) * w.floatAmp;
          return (
            <div
              key={w.id}
              onPointerDown={e => onPointerDown(e, w.id)}
              className="absolute rounded-xl cursor-grab active:cursor-grabbing touch-none"
              style={{
                left: `${w.x}%`,
                top: `${w.y}%`,
                width: 200,
                transform: drag?.id === w.id ? 'none' : `translateY(${floatY}px)`,
                transition: drag?.id === w.id ? 'none' : 'transform 0.3s linear',
                background: 'rgba(63,125,255,0.08)',
                border: '1px solid rgba(63,125,255,0.35)',
                boxShadow:
                  '0 0 24px -4px rgba(63,125,255,0.4), 0 0 60px -10px rgba(63,125,255,0.2), inset 0 0 20px -10px rgba(63,125,255,0.15)',
                backdropFilter: 'blur(6px)',
                WebkitBackdropFilter: 'blur(6px)',
                zIndex: 20,
                opacity: showWindows ? 0.92 : 0,
              }}
            >
              {/* Title bar */}
              <div
                className="flex items-center gap-1.5 px-3 py-2 border-b"
                style={{ borderColor: 'rgba(63,125,255,0.25)' }}
              >
                <span className="w-2 h-2 rounded-full" style={{ background: '#3f7dff' }} />
                <span className="w-2 h-2 rounded-full" style={{ background: '#c7d7ff', opacity: 0.6 }} />
                <span className="w-2 h-2 rounded-full" style={{ background: '#c7d7ff', opacity: 0.3 }} />
                <span
                  className="ml-2 text-[10px] font-mono tracking-wide"
                  style={{ color: 'rgba(199,215,255,0.7)' }}
                >
                  code.tsx
                </span>
              </div>
              {/* Code body */}
              <div className="px-3 py-2.5 overflow-hidden" style={{ maxHeight: 150 }}>
                <pre
                  className="text-[10px] leading-[1.5] font-mono whitespace-pre"
                  style={{
                    color: 'rgba(63,125,255,0.85)',
                    textShadow: '0 0 8px rgba(63,125,255,0.5)',
                    margin: 0,
                  }}
                >
                  {w.code.join('\n')}
                </pre>
              </div>
            </div>
          );
        })}

      {/* Handwritten reveal */}
      <div
        className="absolute inset-0 flex items-center justify-center flex-col gap-3 pointer-events-none"
        style={{
          opacity: showText ? 1 : 0,
          transform: showText ? 'scale(1) translateY(0)' : 'scale(0.85) translateY(20px)',
          transition: 'all 0.9s cubic-bezier(0.22,1,0.36,1)',
        }}
      >
        <p
          className="handwrite font-bold text-center px-6"
          style={{
            fontSize: 'clamp(2.2rem, 7vw, 4.5rem)',
            color: 'var(--brand)',
            textShadow: '0 0 40px rgba(63,125,255,0.55), 0 0 80px rgba(63,125,255,0.25)',
            lineHeight: 1.25,
          }}
        >
          You dream.{' '}
          <span
            style={{
              color: 'var(--lavender)',
              textShadow: '0 0 40px rgba(199,215,255,0.5)',
            }}
          >
            We build.
          </span>
        </p>
        <div
          className="w-32 h-0.5 rounded-full"
          style={{
            background: 'linear-gradient(to right, transparent, var(--brand), transparent)',
          }}
        />
      </div>
    </div>
  );
}
