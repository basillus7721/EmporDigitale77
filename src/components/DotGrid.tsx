import { useEffect, useRef } from 'react';

interface Dot {
  x: number;
  y: number;
  baseOpacity: number;
  opacity: number;
}

export default function DotGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -999, y: -999 });
  const dotsRef = useRef<Dot[]>([]);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const isDark = () => document.documentElement.getAttribute('data-theme') !== 'light';

    const gap = 36;

    function buildDots() {
      dotsRef.current = [];
      const cols = Math.ceil(canvas!.width / gap) + 1;
      const rows = Math.ceil(canvas!.height / gap) + 1;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          dotsRef.current.push({
            x: c * gap,
            y: r * gap,
            baseOpacity: 0.18,
            opacity: 0.18,
          });
        }
      }
    }

    function resize() {
      canvas!.width = window.innerWidth;
      canvas!.height = document.body.scrollHeight;
      buildDots();
    }

    resize();

    function handleMouse(e: MouseEvent) {
      mouseRef.current = { x: e.clientX, y: e.clientY + window.scrollY };
    }
    function handleTouch(e: TouchEvent) {
      if (e.touches[0]) {
        mouseRef.current = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY + window.scrollY,
        };
      }
    }
    window.addEventListener('mousemove', handleMouse);
    window.addEventListener('touchmove', handleTouch, { passive: true });
    window.addEventListener('resize', resize);

    function draw() {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
      const dark = isDark();
      const baseColor = dark ? '199,215,255' : '63,125,255';
      const glowColor = dark ? '63,125,255' : '30,90,220';
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      for (const dot of dotsRef.current) {
        const dx = dot.x - mx;
        const dy = dot.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const glow = Math.max(0, 1 - dist / 140);

        const opacity = dot.baseOpacity + glow * 0.78;
        const size = 1.6 + glow * 3;

        if (glow > 0.02) {
          ctx!.beginPath();
          ctx!.arc(dot.x, dot.y, size + 4, 0, Math.PI * 2);
          ctx!.fillStyle = `rgba(${glowColor},${glow * 0.22})`;
          ctx!.fill();
        }

        ctx!.beginPath();
        ctx!.arc(dot.x, dot.y, size, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${baseColor},${Math.min(1, opacity)})`;
        ctx!.fill();
      }

      rafRef.current = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove', handleMouse);
      window.removeEventListener('touchmove', handleTouch);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.55 }}
    />
  );
}
