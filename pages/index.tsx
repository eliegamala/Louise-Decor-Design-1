import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import Image from 'next/image';
import Link from 'next/link';
import Parallax from '@/components/Parallax';
import AboutMe from "@/components/AboutMe";
import HeroV3 from '@/components/HeroV3';

import clsx from 'clsx';
import { loadJSON } from '@/lib/content';

// keep your Parallax if you want to reuse it later on the page

const Thumb = ({src, quote}:{src:string, quote:string}) => (
  <div>
    <div className="relative aspect-[16/10] rounded-2xl overflow-hidden shadow-soft">
      <Image src={src} alt="" fill className="object-cover" />
    </div>
    <p className="text-xs text-neutral-500 mt-2">“{quote}”</p>
  </div>
);

// small helper for consistent images
const Img = ({
  src, alt, ratio = 'aspect-[16/11]', className,
}: { src:string; alt:string; ratio?:string; className?:string }) => (
  <div className={clsx('relative overflow-hidden rounded-3xl shadow-soft', ratio, className)}>
    <Image src={src} alt={alt} fill className="object-cover" />
  </div>
);


import type { GetStaticProps } from 'next';

interface Service {
  title: string;
  body: string;
}

export const getStaticProps: GetStaticProps = async () => {
  const home = loadJSON('home.json');
  return { props: { home } };
};

export default function Home({ home }: any): JSX.Element {
  return (
    <Layout canonical="/">
      {/* Hero stays as-is */}
      
       <HeroV3
        image={home.hero.image}
        bgClassName={home.hero.bgClassName} // or 'bg-brand-light' / 'bg-gradient-to-b from-[#F7F6F3] to-white'
        primaryHref={home.hero.primaryHref}
        secondaryHref={home.hero.secondaryHref}
      />

      {/* Social proof / testimonials (unchanged) */}
      <section className="container-wide grid md:grid-cols-4 gap-6 py-8">
        {home.testimonials.map((t: { src: string; quote: string }, i: number) => (<Thumb key={i} src={t.src} quote={t.quote} />))}
      </section>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* 1) Editorial overview — balanced image + copy 
      <section className="section bg-white">
        <div className="container-wide grid md:grid-cols-2 gap-10 items-center">
          <Img src="/images/louiswall.jpg" alt="Studio overview" />
          <div>
            <h2 className="font-display text-2xl mb-3">Timeless spaces, lived-in warmth</h2>
            <p className="text-neutral-600 mb-4">
              We design homes that feel effortless: considered circulation, honest materials, and lighting that
              flatters daily life. Every project</section> balances practicality with that quiet, enveloping calm.
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="rounded-2xl border border-neutral-200 p-4">
                <div className="text-s</Parallax>m font-medium text-neutral-900">Clarity from day one</div>
                <p className="text-xs </div>text-neutral-600 mt-1">Scope, budget, and timeline mapped clearly.</p>
              </div>
              <div className="rounded-2xl border border-neutral-200 p-4">
                <div className="text-sm font-medium text-neutral-900">Materials that age well</div>
                <p className="text-xs text-neutral-600 mt-1">Texture and tone over trends.</p>
              </div>
            </div>
            <Link href={home.featured.ctaHref} className="btn btn-ghost mt-6">See our work</Link>
          </div>
        </div>
      </section>
*/}
      
      {/* Keep your Parallax promo cards */}
      <Parallax image={home.hero.image}>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="card p-6">
            <h3 className="font-display text-2xl mb-2">Artfully curated</h3>
            <p className="text-neutral-600">We also source and create original art that elevates your space—browse select pieces in our art collection.</p>
            <Link href="/art" className="btn btn-primary mt-4">Explore art</Link>
          </div>
          <div className="card p-6">
            <h3 className="font-display text-2xl mb-2">Portfolio</h3>
            <p className="text-neutral-600">Peek into kitchens, living rooms, and whole-home transformations.</p>
            <Link href={home.featured.ctaHref} className="btn btn-ghost mt-4">See our work</Link>
          </div>
        </div>
      </Parallax>


      <AboutMe
  hero={home.about.hero}
  detail1={home.about.detail1}
  detail2={home.about.detail2}
  headshot={home.about.headshot}   // optional; remove prop to hide
/>



      {/* 2) Featured project — light visuals + narrative */}
      <section className="section bg-white">
        <div className="container-wide grid lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-5">
            <Img src={home.featured.mainImage} alt="Featured material study" ratio="aspect-[4/3]" />
          </div>
          <div className="lg:col-span-7">
            <h2 className="font-display text-2xl mb-3">{home.featured.title}</h2>
            <p className="text-neutral-600">
              We layered warm woods, softened transitions, and introduced a lighting plan that
              moves from morning clarity to evening glow. Personal heirlooms were integrated to
              keep the story intact.
            </p>
            <div className="grid sm:grid-cols-2 gap-4 mt-5">
              <Img src={home.featured.secondaryImage} alt="Plan refinement" ratio="aspect-[16/11]" />
              <div className="rounded-3xl border border-neutral-200 p-5">
                <div className="text-sm font-medium text-neutral-900 mb-1">Key moves</div>
                <ul className="text-sm text-neutral-700 space-y-2">
                  <li>• Task/ambient/accent lighting in balance</li>
                  <li>• Durable finishes with a soft handfeel</li>
                  <li>• Storage that keeps counters clear</li>
                </ul>
                <Link href={home.featured.ctaHref} className="btn btn-ghost mt-4">{home.featured.ctaLabel ?? "View project"}</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3) Services snapshot — copy-forward with supporting image */}
      <section className="section bg-white">
        <div className="container-wide grid md:grid-cols-3 gap-8 items-start">
          <div className="md:col-span-2">
            <h2 className="font-display text-2xl mb-3">Services at a glance</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {home.services.map((s: Service, i: number) => (
                <div key={i} className="card p-5">
                  <div className="text-sm font-medium text-neutral-900 mb-1">{s.title}</div>
                  <p className="text-sm text-neutral-600">{s.body}</p>
                </div>
              ))}
            </div>
            <Link href="/contact" className="btn btn-primary mt-6">Start a project</Link>
          </div>
          <Img src={home.servicesImage.src} alt={home.servicesImage.alt} ratio="aspect-[4/5]" />
        </div>
      </section>

    </Layout>
  );
}