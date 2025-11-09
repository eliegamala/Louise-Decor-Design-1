import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";

type Props = {
  title?: string;
  kicker?: string;
  blurb?: string;
  image?: string;        // single landscape image
  bgClassName?: string;  // background color/gradient class
  primaryHref?: string;
  secondaryHref?: string;
  primaryLabel?: string;
  secondaryLabel?: string;
};

export default function HeroV3({
  title = "Timeless spaces, lived-in warmth",
  kicker = "Louise Decor & Design",
  blurb = "Quiet, grounded interiors made for everyday life — balancing circulation, light, and tactile materials.",
  image = "/images/hero/hero-wide.jpg",
  bgClassName = "bg-brand-light", // change to any class, e.g. 'bg-[#F7F6F3]' or a gradient
  primaryHref = "/portfolio",
  secondaryHref = "/process",
  primaryLabel = "See our work",
  secondaryLabel = "How we work",
}: Props) {
  return (
    <section className={clsx("relative", bgClassName)}>
      <div className="container-wide py-10 md:py-14">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          {/* Copy */}
          <div className="lg:col-span-5">
            {/* Kicker */}
            <div className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-[11px] text-neutral-700 ring-1 ring-black/5">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-pink/80" />
              {kicker}
            </div>

            <h1 className="font-display text-3xl md:text-4xl leading-tight mt-4">
              {title}
            </h1>

            <p className="text-neutral-700 mt-4 max-w-prose">
              {blurb}
            </p>

            {/* Highlights */}
            <div className="grid sm:grid-cols-2 gap-3 mt-6">
              <div className="rounded-2xl border border-neutral-200 bg-white/70 backdrop-blur p-4">
                <div className="text-sm font-medium text-neutral-900">Materials that age well</div>
                <p className="text-xs text-neutral-600 mt-1">Texture & tone over trends.</p>
              </div>
              <div className="rounded-2xl border border-neutral-200 bg-white/70 backdrop-blur p-4">
                <div className="text-sm font-medium text-neutral-900">Clarity from day one</div>
                <p className="text-xs text-neutral-600 mt-1">Scope, timeline, and budget mapped clearly.</p>
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href={primaryHref} className="btn btn-primary">{primaryLabel}</Link>
              <Link href={secondaryHref} className="btn btn-ghost">{secondaryLabel}</Link>
            </div>
          </div>

          {/* Single landscape image */}
          <div className="lg:col-span-7">
            <div className="relative overflow-hidden rounded-3xl shadow-soft aspect-[16/9]">
              <Image src={image} alt="Project atmosphere" fill className="object-cover" priority />
              {/* optional subtle vignette to blend with bg */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/5 via-transparent to-transparent" />
            </div>
          </div>
        </div>

        {/* Soft divider */}
        <div className="mt-10 h-px bg-gradient-to-r from-transparent via-neutral-200 to-transparent" />
      </div>
    </section>
  );
}
