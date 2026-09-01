const services = [
  'Website Design',
  'Animated Experiences',
  'E-commerce Stores',
  'SEO Foundations',
  'Custom Development',
  'Care & Support',
  'Brand Identity',
  'UI/UX Design',
  'Landing Pages',
  'Web Apps',
];

export default function Marquee() {
  const doubled = [...services, ...services];

  return (
    <div
      className="relative overflow-hidden py-5 border-y"
      style={{ borderColor: 'var(--border)', background: 'rgba(63,125,255,0.04)' }}
    >
      {/* Edge fades */}
      <div
        className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to right, var(--bg), transparent)' }}
      />
      <div
        className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to left, var(--bg), transparent)' }}
      />

      <div className="flex animate-marquee whitespace-nowrap">
        {doubled.map((s, i) => (
          <span key={i} className="inline-flex items-center mx-8">
            <span
              className="font-display font-bold text-sm sm:text-base tracking-wide"
              style={{ color: i % 3 === 0 ? 'var(--brand)' : 'var(--text-muted)' }}
            >
              {s}
            </span>
            <span
              className="ml-8 inline-block w-1.5 h-1.5 rounded-full"
              style={{ background: 'var(--brand)', opacity: 0.5 }}
            />
          </span>
        ))}
      </div>
    </div>
  );
}
