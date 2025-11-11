// ================================================
// fully CMS-driven (SEO, heading/intro, pieces, gallery)
// ================================================
import { loadJSON } from '@/lib/content';
import type { GetStaticProps } from 'next';
import Layout from '@/components/Layout';
import Image from 'next/image';

export type Piece = {
  id: string | number;
  src: string;
  title: string;
  medium?: string;
  size?: string;
  year?: string;
  description?: string;
};

type ArtPage = {
  seo?: { title?: string; description?: string };
  heading?: string;
  intro?: string;
  pieces?: Piece[];
  // optional lightweight gallery for mood shots
  gallery?: { src: string; alt?: string }[];
};

const FALLBACK_META = {
  title: 'Art collection',
  description: 'Original art and limited edition prints',
  canonical: '/art',
  heading: 'Art',
  intro:
    'In addition to interiors, we create and curate art. Each piece is designed to complement the textures and tones we love in our projects.',
};

// Optional fallback pieces if CMS is empty (can remove these later)
const FALLBACK_PIECES: Piece[] = [
  { id: 1, src: '/images/a1.jpg', title: 'Untitled 1', medium: 'Mixed media on canvas', size: '24” × 36”' },
  { id: 2, src: '/images/a2.jpg', title: 'Untitled 2', medium: 'Oil on linen', size: '30” × 40”' },
  { id: 4, src: '/images/a3.jpg', title: 'Untitled 4', medium: 'Watercolor on paper', size: '18” × 24”' },
  { id: 5, src: '/images/a2.jpg', title: 'Untitled 5', medium: 'Ink on paper', size: '22” × 30”' },
  { id: 6, src: '/images/a1.jpg', title: 'Untitled 6', medium: 'Charcoal on paper', size: '24” × 36”' },
  { id: 7, src: '/images/a2.jpg', title: 'Untitled 7', medium: 'Mixed media on canvas', size: '30” × 40”' },
  { id: 8, src: '/images/a3.jpg', title: 'Untitled 8', medium: 'Oil on linen', size: '20” × 24”' },
];

export const getStaticProps: GetStaticProps = async () => {
  const page = (loadJSON('art.json') || {}) as ArtPage;
  return { props: { page }, revalidate: 60 };
};

export default function Art({ page }: { page: ArtPage }) {
  const title = page?.seo?.title || FALLBACK_META.title;
  const description = page?.seo?.description || FALLBACK_META.description;
  const canonical = FALLBACK_META.canonical;

  const heading = page?.heading || FALLBACK_META.heading;
  const intro = page?.intro || FALLBACK_META.intro;

  const pieces = Array.isArray(page?.pieces) && page!.pieces!.length > 0 ? page!.pieces! : FALLBACK_PIECES;

  return (
    <Layout title={title} description={description} canonical={canonical}>
      <section className="section">
        <div className="container-wide">
          <h1 className="font-display text-3xl mb-6">{heading}</h1>
          {intro && <p className="text-neutral-600 max-w-2xl mb-8">{intro}</p>}

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {pieces.map((p) => (
              <article key={p.id} className="card overflow-hidden">
                <div className="relative aspect-[4/5]">
                  <Image src={p.src} alt={p.title} fill className="object-cover" />
                </div>
                <div className="p-4">
                  <div className="font-medium leading-tight">{p.title}</div>
                  <div className="text-sm text-neutral-600">
                    {[p.medium, p.size, p.year].filter(Boolean).join(' · ')}
                  </div>
                  {p.description && <p className="mt-2 text-sm text-neutral-700">{p.description}</p>}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Optional CMS-driven gallery (e.g., room/mood shots) */}
      {Array.isArray(page?.gallery) && page!.gallery!.length > 0 && (
        <section className="section bg-white">
          <div className="container-wide grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {page!.gallery!.map((g, i) => (
              <div key={i} className="relative aspect-[16/11] rounded-2xl overflow-hidden shadow-soft">
                <Image src={g.src} alt={g.alt || ''} fill className="object-cover" />
              </div>
            ))}
          </div>
        </section>
      )}
    </Layout>
  );
}
