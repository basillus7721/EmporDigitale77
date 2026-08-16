import { useState, useEffect, useRef } from 'react';

export function useCounter(target: number, duration = 2000, startOnMount = false) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(startOnMount);
  const [done, setDone] = useState(false);
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!startOnMount && ref.current) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setStarted(true);
            observer.disconnect();
          }
        },
        { threshold: 0.4 }
      );
      observer.observe(ref.current);
      return () => observer.disconnect();
    }
  }, [startOnMount]);

  useEffect(() => {
    if (!started) return;
    let start = 0;
    const step = 16;
    const steps = duration / step;
    const increment = target / steps;
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        setDone(true);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, step);
    return () => clearInterval(timer);
  }, [started, target, duration]);

  return { count, ref, done };
}
