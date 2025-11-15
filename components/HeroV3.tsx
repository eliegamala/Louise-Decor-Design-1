import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";

type Highlight = { title: string; text: string };

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
  highlights?: Highlight[];
};

export default function HeroV3({
  title,
  kicker,
  blurb,
  image,
  bgClassName,
  primaryHref,
  secondaryHref,
  primaryLabel,
  secondaryLabel,
  highlights = [],
}: Props) {
  // Safe fallbacks so the component doesn't break if fields are missing
  const _title = title ?? "Timeless spaces, lived-in warmth";
  const _kicker = kicker ?? "Louise Decor & Design";
  const _blurb =
    blurb ?? "Quiet, grounded interiors made for everyday life — balancing circulation, light, and tactile materials.";
  const _image = image ?? "/images/hero/hero-wide.jpg";
  const _bg = bgClassName ?? "bg-brand-light";
  const _primaryHref = primaryHref ?? "/portfolio";
  const _secondaryHref = secondaryHref ?? "/process";
  const _primaryLabel = primaryLabel ?? "See our work";
  const _secondaryLabel = secondaryLabel ?? "How we work";

  // If CMS didn't provide highlights, show two tasteful defaults
  const _highlights: Highlight[] =
    highlights.length > 0
      ? highlights
      : [
          { title: "Materials that age well", text: "Texture & tone over trends." },
          { title: "Clarity from day one", text: "Scope, timeline, and budget mapped clearly." },
        ];

  return (
      <section
      className="relative"
      style={{ backgroundColor: "#FAF7F7" }} // forced background
    >
      <div className="container-wide py-10 md:py-14">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          {/* Copy */}
          <div className="lg:col-span-5">
            {/* Kicker */}
            {_kicker && (
              <div className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-[11px] text-neutral-700 ring-1 ring-black/5">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-pink/80" />
                {_kicker}
              </div>
            )}

            {_title && <h1 className="font-display text-3xl md:text-4xl leading-tight mt-4">{_title}</h1>}

            {_blurb && <p className="text-neutral-700 mt-4 max-w-prose">{_blurb}</p>}

            {/* Highlights */}
            {Array.isArray(_highlights) && _highlights.length > 0 && (
              <div className="grid sm:grid-cols-2 gap-3 mt-6">
                {_highlights.map((h, i) => (
                  <div key={i} className="rounded-2xl border border-neutral-200 bg-white/70 backdrop-blur p-4">
                    <div className="text-sm font-medium text-neutral-900">{h.title}</div>
                    <p className="text-xs text-neutral-600 mt-1">{h.text}</p>
                  </div>
                ))}
              </div>
            )}

            {/* CTAs */}
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href={_primaryHref} className="btn btn-primary">{_primaryLabel}</Link>
              {(_secondaryHref || _secondaryLabel) && (
                <Link href={_secondaryHref} className="btn btn-ghost">{_secondaryLabel}</Link>
              )}
            </div>
          </div>

          {/* Single landscape image */}
          <div className="lg:col-span-7">
            <div className="relative overflow-hidden rounded-3xl shadow-soft aspect-[16/9]">
              <Image src={_image} alt="Project atmosphere" fill className="object-cover" priority />
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

