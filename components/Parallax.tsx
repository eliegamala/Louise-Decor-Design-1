'use client'

import React, { useEffect, useRef } from 'react'

type ParallaxProps = {
  image: string
  children?: React.ReactNode
  /** How strong the parallax should be (0.1–0.6 is nice) */
  speed?: number
}

export default function Parallax({ image, children, speed = 0.3 }: ParallaxProps) {
  const bgRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const el = bgRef.current
    if (!el) return

    let frameId: number | null = null

    const onScroll = () => {
      if (!el) return
      if (frameId) cancelAnimationFrame(frameId)

      frameId = window.requestAnimationFrame(() => {
        const rect = el.parentElement?.getBoundingClientRect()
        if (!rect) return

        const windowHeight = window.innerHeight
        // Progress of the section through the viewport (0–1-ish)
        const progress = (windowHeight - rect.top) / (windowHeight + rect.height)
        const clamped = Math.max(0, Math.min(1, progress))

        // Move a bit up/down based on scroll (tune multiplier if needed)
        const translateY = (clamped - 0.5) * -100 * speed

        el.style.transform = `translate3d(0, ${translateY}px, 0)`
      })
    }

    onScroll() // initial position

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      if (frameId) cancelAnimationFrame(frameId)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [speed])

  return (
    <section className="section relative overflow-hidden">
      {/* Background layer */}
      <div
        ref={bgRef}
        className="
          parallax
          absolute inset-0
          bg-cover bg-center bg-no-repeat
          will-change-transform
          pointer-events-none
        "
        style={{ backgroundImage: `url(${image})` }}
      />

      {/* Spacer to give the section its height */}
      <div className="relative w-full h-[360px] sm:h-[400px] md:h-[500px]" />

      {/* Content below the image, same as before */}
      {children && (
        <div className="container-narrow mt-8 px-4 mx-auto">
          {children}
        </div>
      )}
    </section>
  )
}
