'use client';

import { useTheme } from '@/hooks/useTheme';
import DotGrid from '@/components/DotGrid';
import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import Marquee from '@/components/Marquee';
import Services from '@/components/Services';
import CodeAnimation from '@/components/CodeAnimation';
import Pricing from '@/components/Pricing';
import Process from '@/components/Process';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import LoadingScreen from '@/components/LoadingScreen';

export default function App() {
  const { theme, toggle } = useTheme();

  return (
    <div className="relative min-h-screen">
      <LoadingScreen />
      <DotGrid />
      <div className="relative z-10">
        <Nav theme={theme} toggleTheme={toggle} />
        <main>
          <Hero />
          <Marquee />
          <Services />
          <CodeAnimation />
          <Pricing />
          <Process />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}
