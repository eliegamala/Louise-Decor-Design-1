import Layout from '@/components/Layout';
import HeroV3 from '@/components/HeroV3';
import Image from 'next/image';
import Link from 'next/link';
import Parallax from '@/components/Parallax';
import AboutMe from '@/components/AboutMe';

import clsx from 'clsx';
import { loadJSON } from '@/lib/content';

import type { GetStaticProps } from 'next';

type Testimonial = { src: string; quote: string };
type ParallaxCard = {
  title: string;
  text: string;
  ctaLabel?: string;
  href?: string;
  variant?: 'primary' | 'ghost';
};
type Service = { title: string; body: string; emphasis?: boolean };

const Thumb = ({ src, quote }: { src: string; quote: string }) => (
  <div>
    <div className="relative aspect-[16/10] rounded-2xl overflow-hidden shadow-soft">
      <Image src={src} alt="" fill className="object-cover" />
    </div>
    <p className="text-xs text-neutral-500 mt-2">“{quote}”</p>
  </div>
);

const Img = ({
  src,
  alt,
  ratio = 'aspect-[16/11]',
  className,
}: {
  src: string;
  alt: string;
  ratio?: string;
  className?: string;
}) => (
  <div className={clsx('relative overflow-hidden rounded-3xl shadow-soft', ratio, className)}>
    <Image src={src} alt={alt} fill className="object-cover" />
  </div>
);

export const getStaticProps: GetStaticProps = async () => {
  const home = loadJSON('home.json');
  return { props: { home }, revalidate: 60 };
};

export default function Home({ home }: any): JSX.Element {
  return (
    <Layout canonical="/">
      {/* Hero – all props from CMS yes */}
      <HeroV3
        title={home.hero?.title}
        kicker={home.hero?.kicker}
        blurb={home.hero?.blurb}
        image={home.hero?.image}
        bgClassName={home.hero?.bgClassName}
        primaryHref={home.hero?.primaryHref}
        primaryLabel={home.hero?.primaryLabel}
        secondaryHref={home.hero?.secondaryHref}
        secondaryLabel={home.hero?.secondaryLabel}
        highlights={home.hero?.highlights}
      />

      {/* Testimonials – optional heading + list */}
      <section className="container-wide py-8">
        {home.testimonialsMeta?.heading && (
          <h2 className="font-display text-2xl mb-4">{home.testimonialsMeta.heading}</h2>
        )}
        <div className="grid md:grid-cols-4 gap-6">
          {home.testimonials?.map((t: Testimonial, i: number) => (
            <Thumb key={i} src={t.src} quote={t.quote} />
          ))}
        </div>
      </section>

      {/* Parallax – uses its OWN image from CMS (not hero) */}
      <Parallax image={home.parallax?.image}>
        <div className="grid md:grid-cols-2 gap-6">
          {home.parallax?.cards?.map((c: ParallaxCard, i: number) => (
            <div key={i} className="card p-6">
              <h3 className="font-display text-2xl mb-2">{c.title}</h3>
              <p className="text-neutral-600">{c.text}</p>
              {c.ctaLabel && (
                <Link
                  href={c.href ?? '#'}
                  className={clsx('btn mt-4', c.variant === 'primary' ? 'btn-primary' : 'btn-ghost')}
                >
                  {c.ctaLabel}
                </Link>
              )}
            </div>
          ))}
        </div>
      </Parallax>

      {/* About Me – now fully CMS-controlled */}
      <AboutMe {...home.about} />

      {/* Featured project – all text/images editable */}
      <section className="section bg-white">
        <div className="container-wide grid lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-5">
            <Img src={home.featured?.mainImage} alt="Featured" ratio="aspect-[4/3]" />
          </div>
          <div className="lg:col-span-7">
            <h2 className="font-display text-2xl mb-3">{home.featured?.title}</h2>
            <p className="text-neutral-600">{home.featured?.body}</p>
            <div className="grid sm:grid-cols-2 gap-4 mt-5">
              <Img src={home.featured?.secondaryImage} alt="Secondary visual" ratio="aspect-[16/11]" />
              <div className="rounded-3xl border border-neutral-200 p-5">
                <div className="text-sm font-medium text-neutral-900 mb-1">
                  {home.featured?.keyMovesTitle ?? 'Key moves'}
                </div>
                <ul className="text-sm text-neutral-700 space-y-2">
                  {home.featured?.keyMoves?.map((item: string, i: number) => (
                    <li key={i}>• {item}</li>
                  ))}
                </ul>
                <Link href={home.featured?.ctaHref ?? '#'} className="btn btn-ghost mt-4">
                  {home.featured?.ctaLabel ?? 'View project'}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services – heading + CTA + cards all editable */}
      <section className="section bg-white">
        <div className="container-wide grid md:grid-cols-3 gap-8 items-start">
          <div className="md:col-span-2">
            <h2 className="font-display text-2xl mb-3">
              {home.servicesMeta?.heading ?? 'Services at a glance'}
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {home.services?.map((s: Service, i: number) => (
                <div key={i} className={clsx('card p-5', s.emphasis && 'ring-1 ring-neutral-300')}>
                  <div className="text-sm font-medium text-neutral-900 mb-1">{s.title}</div>
                  <p className="text-sm text-neutral-600">{s.body}</p>
                </div>
              ))}
            </div>
            <Link href={home.servicesMeta?.ctaHref ?? '/contact'} className="btn btn-primary mt-6">
              {home.servicesMeta?.ctaLabel ?? 'Start a project'}
            </Link>
          </div>
          <Img src={home.servicesImage?.src} alt={home.servicesImage?.alt} ratio="aspect-[4/5]" />
        </div>
      </section>
    </Layout>
  );
}
