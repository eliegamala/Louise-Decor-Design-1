'use client'

import React from 'react'

function useParallax(speed = 0.15) {
  const ref = React.useRef<HTMLDivElement | null>(null)
  const [offset, setOffset] = React.useState(0)

  React.useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return

      const rect = ref.current.getBoundingClientRect()

      // Simple, natural parallax: move relative to distance from top
      // Small speed so it feels subtle & not "closing"
      setOffset(rect.top * speed)
    }

    handleScroll() // run once on mount

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [speed])

  return { ref, offset }
}

export default function Parallax({
  image,
  children,
}: {
  image: string
  children?: React.ReactNode
}) {
  const { ref, offset } = useParallax(0.50) // tweak between 0.1–0.25 if needed

  return (
    <section className="section relative overflow-hidden">
      <div
        ref={ref}
        className="relative w-full h-[360px] sm:h-[400px] md:h-[500px] overflow-hidden"
      >
        <div
          className="
            absolute inset-0
            bg-cover bg-center bg-no-repeat
            will-change-transform
          "
          style={{
            backgroundImage: `url(${image})`,
            transform: `translateY(${offset}px)`,
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
