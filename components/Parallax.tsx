import { useEffect, useRef, useState } from 'react';

export default function Parallax({ image, children }: { image: string, children?: React.ReactNode }) {
  const [offsetY, setOffsetY] = useState(0);
  const ref = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const scrollPosition = window.scrollY;
        // Adjust the multiplier to control parallax intensity (0.5 = slower, 1 = same speed as scroll)
        const parallaxSpeed = 1;
        setOffsetY(scrollPosition * parallaxSpeed);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section ref={ref} className="section relative overflow-hidden">
      <div
        className="w-full h-[360px] sm:h-[400px] md:h-[500px] bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `url(${image})`,
          transform: `translateY(${offsetY}px)`,
          willChange: 'transform' // Optimizes performance
        }}
      />
      {children && (
        <div className="container-narrow mt-8 px-4 mx-auto">
          {children}
        </div>
      )}
    </section>
  )
}
