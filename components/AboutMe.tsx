import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";

type AboutHighlight = {
  title?: string;
  text?: string;
};

type Props = {
  // Images (with optional alt text)
  hero?: string;       // wide landscape image
  heroAlt?: string;
  detail1?: string;    // small supporting image
  detail1Alt?: string;
  detail2?: string;    // small supporting image
  detail2Alt?: string;
  headshot?: string;   // small circle headshot (optional)
  headshotAlt?: string;

  // Copy
  heading?: string;
  intro?: string;            // short intro paragraph
  highlights?: AboutHighlight[];
  quote?: string;            // pull-quote

  // Buttons
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;

  // ClassName passthrough (optional)
  className?: string;
};

export default function AboutMe({
  hero = "/images/about-me.jpg",
  heroAlt = "Studio atmosphere",
  detail1 = "/images/about-me.jpg",
  detail1Alt = "Material palette",
  detail2 = "/images/about-me.jpg",
  detail2Alt = "Light and texture study",
  headshot,
  headshotAlt = "Designer",
  heading = "About me",
  intro,
  highlights = [],
  quote,
  primaryLabel = "See my work",
  primaryHref = "/portfolio",
  secondaryLabel = "How I work",
  secondaryHref = "/process",
  className,
}: Props) {
  const hasButtons = (primaryLabel && primaryHref) || (secondaryLabel && secondaryHref);

  return (
    <section className={clsx("section bg-white", className)} id="about">
      <div className="container-wide grid lg:grid-cols-12 gap-10 items-start">
        {/* IMAGE COLLAGE (landscape-led) */}
        <div className="lg:col-span-6">
          <div className="grid gap-4">
            {/* Wide landscape hero */}
            <div className="relative overflow-hidden rounded-3xl shadow-soft aspect-[16/9]">
              <Image src={hero} alt={heroAlt || ""} fill className="object-cover" priority />
            </div>

            {/* Two small supporting tiles */}
            <div className="grid grid-cols-2 gap-4">
              {detail1 && (
                <div className="relative overflow-hidden rounded-3xl shadow-soft aspect-square">
                  <Image src={detail1} alt={detail1Alt || ""} fill className="object-cover" />
                </div>
              )}
              {detail2 && (
                <div className="relative overflow-hidden rounded-3xl shadow-soft aspect-square">
                  <Image src={detail2} alt={detail2Alt || ""} fill className="object-cover" />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* COPY */}
        <div className="lg:col-span-6">
          {heading && <h2 className="font-display text-2xl mb-3">{heading}</h2>}

          {intro && <p className="text-neutral-600 mb-4">{intro}</p>}

          {/* Highlights */}
          {highlights?.length ? (
            <div className="grid sm:grid-cols-2 gap-3 mb-6">
              {highlights.map((h, i) => (
                <div key={i} className="rounded-2xl border border-neutral-200 p-4">
                  {h.title && (
                    <div className="text-sm font-medium text-neutral-900">{h.title}</div>
                  )}
                  {h.text && (
                    <p className="text-xs text-neutral-600 mt-1">{h.text}</p>
                  )}
                </div>
              ))}
            </div>
          ) : null}

          {/* Short backstory with a small circular headshot */}
          <div className="flex items-start gap-4">
            {headshot && (
              <div className="relative h-16 w-16 shrink-0 rounded-full overflow-hidden ring-1 ring-black/5 shadow-soft">
                <Image src={headshot} alt={headshotAlt || ""} fill className="object-cover" />
              </div>
            )}
            <div className="text-neutral-700 leading-relaxed space-y-3">
              {quote && <p className="italic text-neutral-900">“{quote}”</p>}
            </div>
          </div>

          {hasButtons && (
            <div className="mt-6 flex gap-3">
              {primaryLabel && primaryHref && (
                <Link href={primaryHref} className="btn btn-ghost">
                  {primaryLabel}
                </Link>
              )}
              {secondaryLabel && secondaryHref && (
                <Link href={secondaryHref} className="btn btn-primary">
                  {secondaryLabel}
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
