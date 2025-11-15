import { useEffect, useRef } from "react";

export default function Parallax({
  image,
  children,
}: {
  image: string;
  children?: React.ReactNode;
}) {
  const parallaxRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = parallaxRef.current;
    if (!el) return;

    const speed = 0.3; // tweak for more/less parallax

    const handleScroll = () => {
      const rect = el.getBoundingClientRect();
      // move background slower than scroll
      const offset = rect.top * speed;
      el.style.transform = `translate3d(0, ${-offset}px, 0)`;
    };

    handleScroll(); // set initial position
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <section className="section relative overflow-hidden">
      <div
        ref={parallaxRef}
        className="parallax w-full h-[360px] sm:h-[400px] md:h-[500px] bg-cover bg-center bg-no-repeat will-change-transform"
        style={{ backgroundImage: `url(${image})` }}
      />
      {children && (
        <div className="container-narrow mt-8 px-4 mx-auto">
          {children}
        </div>
      )}
    </section>
  );
}
