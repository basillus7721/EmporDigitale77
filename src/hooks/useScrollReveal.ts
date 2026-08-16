import { useEffect, useRef } from 'react';

export function useScrollReveal(threshold = 0.15) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold }
    );

    const children = el.querySelectorAll('.reveal');
    if (el.classList.contains('reveal')) observer.observe(el);
    children.forEach(child => observer.observe(child));

    return () => observer.disconnect();
  }, [threshold]);

  return ref;
}
