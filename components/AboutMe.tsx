import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";

type Props = {
  hero?: string;      // wide landscape image
  detail1?: string;   // small supporting image
  detail2?: string;   // small supporting image
  headshot?: string;  // small circle headshot (optional)
};

export default function AboutMe({
  hero = "/images/about-me.jpg",
  detail1 = "/images/about-me.jpg",
  detail2 = "/images/about-me.jpg",
  headshot = "/images/about-me.jpg",
}: Props) {
  return (
    <section className="section bg-white" id="about">
      <div className="container-wide grid lg:grid-cols-12 gap-10 items-start">
        {/* IMAGE COLLAGE (landscape-led) */}
        <div className="lg:col-span-6">
          <div className="grid gap-4">
            {/* Wide landscape hero */}
            <div className="relative overflow-hidden rounded-3xl shadow-soft aspect-[16/9]">
              <Image src={hero} alt="Studio atmosphere" fill className="object-cover" priority />
            </div>

            {/* Two small supporting tiles */}
            <div className="grid grid-cols-2 gap-4">
              <div className="relative overflow-hidden rounded-3xl shadow-soft aspect-square">
                <Image src={detail1} alt="Material palette" fill className="object-cover" />
              </div>
              <div className="relative overflow-hidden rounded-3xl shadow-soft aspect-square">
                <Image src={detail2} alt="Light and texture study" fill className="object-cover" />
              </div>
            </div>
          </div>
        </div>

        {/* COPY */}
        <div className="lg:col-span-6">
          <h2 className="font-display text-2xl mb-3">About me</h2>
          <p className="text-neutral-600 mb-4">
            I design calm, grounded spaces with lived-in warmth—balancing circulation, light,
            and tactile materials so your home welcomes you at every turn.
          </p>

          {/* Highlights (match homepage cards) */}
          <div className="grid sm:grid-cols-2 gap-3 mb-6">
            <div className="rounded-2xl border border-neutral-200 p-4">
              <div className="text-sm font-medium text-neutral-900">Timeless over trendy</div>
              <p className="text-xs text-neutral-600 mt-1">Classic forms and finishes that age well.</p>
            </div>
            <div className="rounded-2xl border border-neutral-200 p-4">
              <div className="text-sm font-medium text-neutral-900">Tactile comfort</div>
              <p className="text-xs text-neutral-600 mt-1">Textures you want to touch; tones that soften a room.</p>
            </div>
          </div>

          {/* Short backstory with a small circular headshot (not a portrait hero) */}
          <div className="flex items-start gap-4">
            {/* Optional circular headshot accent */}
            {headshot && (
              <div className="relative h-16 w-16 shrink-0 rounded-full overflow-hidden ring-1 ring-black/5 shadow-soft">
                <Image src={headshot} alt="Designer" fill className="object-cover" />
              </div>
            )}
            <div className="text-neutral-700 leading-relaxed space-y-3">
              <p>
                I started in furniture and product development—learning how materials behave in
                the real world. That hands-on background anchors my interiors: quiet, functional,
                and unmistakably warm.
              </p>
              <p className="italic text-neutral-900">“Home should feel like an exhale.”</p>
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <Link href="/portfolio" className="btn btn-ghost">See my work</Link>
            <Link href="/process" className="btn btn-primary">How I work</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
