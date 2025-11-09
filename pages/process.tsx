// pages/process.tsx
import { loadJSON } from '@/lib/content';
import clsx from 'clsx';
import Image from 'next/image';
import Layout from '@/components/Layout';
import type { GetStaticProps } from 'next';

type Step = { title: string; body: string; image?: string };
type Highlight = { title?: string; text?: string };
type Card = { title: string; body: string };

type ProcessPage = {
  seo?: { title?: string; description?: string };
  heading?: string;
  intro?: string;

  steps?: Step[];

  overview?: {
    image?: string;
    heading?: string;
    body?: string;
    highlights?: Highlight[];
  };

  case?: {
    mainImage?: string;
    secondaryImage?: string;
    title?: string;
    body?: string;
    keyMovesTitle?: string;
    keyMoves?: string[];
  };

  expect?: {
    heading?: string;
    cards?: Card[];
    sideImage?: { src: string; alt: string };
  };
};

// small helper for consistent images
const Img = ({
  src,
  alt,
  ratio = 'aspect-[16/11]',
  className,
  priority = false,
}: {
  src?: string;
  alt?: string;
  ratio?: string;
  className?: string;
  priority?: boolean;
}) =>
  src ? (
    <div className={clsx('relative overflow-hidden rounded-3xl shadow-soft', ratio, className)}>
      <Image src={src} alt={alt ?? ''} fill className="object-cover" priority={priority} />
    </div>
  ) : null;

export const getStaticProps: GetStaticProps = async () => {
  const page = loadJSON('process.json') as ProcessPage;
  return { props: { page }, revalidate: 60 };
};

export default function ProcessPage({ page }: { page: ProcessPage }) {
  const seoTitle =
    page?.seo?.title ? `${page.seo.title} – Louise Decor & Design` : 'Our process – Louise Decor & Design';
  const seoDesc = page?.seo?.description ?? '';

  return (
    <Layout title={seoTitle} description={seoDesc} canonical="/process">
      {/* Steps */}
      {(page.steps?.length || page.heading) && (
        <section className="section bg-brand-light" id="steps">
          <div className="container-narrow">
            <h1 className="font-display text-3xl mb-6">{page.heading ?? 'Our process'}</h1>
            {page.intro && <p className="text-neutral-600 mb-6">{page.intro}</p>}
            <div className="grid md:grid-cols-2 gap-6">
              {page.steps?.map((s, i) => (
                <div key={`${s.title}-${i}`} className="card p-6">
                  <div className="text-xs text-neutral-500 mb-2">Step {(i + 1).toString().padStart(2, '0')}</div>
                  <div className="font-display text-xl mb-2">{s.title}</div>
                  <p className="text-neutral-600">{s.body}</p>
                  {s.image && (
                    <div className="mt-4">
                      <Img src={s.image} alt={s.title} ratio="aspect-[16/10]" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Overview — balanced image + copy */}
      {(page.overview?.image || page.overview?.heading || page.overview?.body) && (
        <section className="section bg-white" id="overview">
          <div className="container-wide grid md:grid-cols-2 gap-10 items-center">
            <Img src={page.overview?.image} alt="Design overview" />
            <div>
              <h2 className="font-display text-2xl mb-3">
                {page.overview?.heading ?? 'From idea to lived-in comfort'}
              </h2>
              {page.overview?.body && <p className="text-neutral-600 mb-4">{page.overview.body}</p>}
              {page.overview?.highlights?.length ? (
                <div className="grid sm:grid-cols-2 gap-3">
                  {page.overview.highlights.map((h, i) => (
                    <div key={i} className="rounded-2xl border border-neutral-200 p-4">
                      {h.title && <div className="text-sm font-medium text-neutral-900">{h.title}</div>}
                      {h.text && <p className="text-xs text-neutral-600 mt-1">{h.text}</p>}
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </section>
      )}

      {/* Case study — visuals + narrative */}
      {(page.case?.mainImage || page.case?.title || page.case?.body) && (
        <section className="section bg-white" id="case">
          <div className="container-wide grid lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-5">
              <Img src={page.case?.mainImage} alt="Project material study" ratio="aspect-[4/3]" />
            </div>
            <div className="lg:col-span-7">
              <h2 className="font-display text-2xl mb-3">
                {page.case?.title ?? 'A kitchen that invites gathering'}
              </h2>
              {page.case?.body && <p className="text-neutral-600">{page.case.body}</p>}
              {(page.case?.secondaryImage || page.case?.keyMoves?.length) && (
                <div className="grid sm:grid-cols-2 gap-4 mt-5">
                  <Img src={page.case?.secondaryImage} alt="Plan refinement" ratio="aspect-[16/11]" />
                  <div className="rounded-3xl border border-neutral-200 p-5">
                    <div className="text-sm font-medium text-neutral-900 mb-1">
                      {page.case?.keyMovesTitle ?? 'Key moves'}
                    </div>
                    <ul className="text-sm text-neutral-700 space-y-2">
                      {page.case?.keyMoves?.map((k, i) => (
                        <li key={i}>• {k}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* What to expect — text-led with a supporting image */}
      {(page.expect?.heading || page.expect?.cards?.length || page.expect?.sideImage) && (
        <section className="section bg-white" id="expect">
          <div className="container-wide grid md:grid-cols-3 gap-8 items-start">
            <div className="md:col-span-2">
              <h2 className="font-display text-2xl mb-3">{page.expect?.heading ?? 'What to expect'}</h2>
              {page.expect?.cards?.length ? (
                <div className="grid sm:grid-cols-2 gap-4">
                  {page.expect.cards.map((c, i) => (
                    <div key={i} className="card p-5">
                      <div className="text-sm font-medium text-neutral-900 mb-1">{c.title}</div>
                      <p className="text-sm text-neutral-600">{c.body}</p>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
            <Img
              src={page.expect?.sideImage?.src}
              alt={page.expect?.sideImage?.alt || 'Expectations visual'}
              ratio="aspect-[4/5]"
            />
          </div>
        </section>
      )}
    </Layout>
  );
}
