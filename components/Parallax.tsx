import { useEffect, useRef, useState } from 'react';

export default function Parallax({ image, children }: { image: string, children?: React.ReactNode }) {
  const [offsetY, setOffsetY] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const scrollPosition = window.scrollY;
        // Calculate offset relative to the section's position
        const parallaxSpeed = 0.3; // Slower speed for better effect
        setOffsetY((scrollPosition - rect.top) * parallaxSpeed);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="section relative overflow-hidden">
      <div 
        ref={containerRef}
        className="relative w-full h-[360px] sm:h-[400px] md:h-[500px]"
      >
        {/* Parallax background layer */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: `url(${image})`,
            transform: `translateY(${offsetY}px)`,
            willChange: 'transform'
          }}
        />
      </div>
      
      {children && (
        <div className="container-narrow mt-8 px-4 mx-auto">
          {children}
        </div>
      )}
    </section>
  )
}
