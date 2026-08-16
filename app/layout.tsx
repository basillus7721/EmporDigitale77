import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/next';
import '@/index.css';

export const metadata: Metadata = {
  title: 'Empor Digitale | High-Tech Website Agency',
  description:
    'Empor Digitale crafts high-tech, animated websites and digital experiences that help ambitious brands stand out.',
  icons: {
    icon: {
      url: '/emporfavicon.png?v=2',
      type: 'image/png',
    },
  },
  openGraph: {
    title: 'Empor Digitale | High-Tech Website Agency',
    description: 'High-tech websites and digital experiences built to stand out.',
    images: ['/emporlogo.png'],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
