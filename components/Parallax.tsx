import { useEffect, useState, useRef } from 'react';

export default function Parallax({
  image,
  children,
}: {
  image: string;
  children?: React.ReactNode;
}) {
  const [offset, setOffset] = useState(0);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight || 1;

      // Normalise how far the section is in view (0 = top of viewport)
      const progress = 1 - rect.top / viewportHeight;

      // Adjust factor (0.2 = subtle, 0.4 = stronger parallax)
      const parallaxOffset = progress * 40;

      setOffset(parallaxOffset);
    };

    handleScroll(); // initial
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section ref={sectionRef} className="section relative overflow-hidden">
      <div className="relative h-[320px] sm:h-[380px] md:h-[460px] overflow-hidden">
        <div
          className="
            absolute inset-0
            bg-cover bg-center bg-no-repeat
            will-change-transform
          "
          style={{
            backgroundImage: `url(${image})`,
            transform: `translateY(${offset * -1}px)`,
          }}
        />
      </div>

      {children && (
        <div className="container-narrow mt-8 px-4 mx-auto">
          {children}
        </div>
      )}
    </section>
  );
}
