// ================================================
// SINGLE FILE VERSION – just paste this into /pages/art.tsx
// Edit the META and PIECES below by hand. No other files needed.
// ================================================
import { loadJSON } from '@/lib/content';
import CMSHeader from '@/components/CMSHeader';
import type { GetStaticProps } from 'next';
import Layout from '@/components/Layout';
import Image from 'next/image';

// ---- Page copy & meta (edit manually) ----
const META = {
  title: "Art collection",
  description:
    "Original art and limited edition prints",
  canonical: "/art",
  heading: "Art",
  intro:
    "In addition to interiors, we create and curate art. Each piece is designed to complement the textures and tones we love in our projects.",
};

// ---- Art grid data (edit manually) ----
// Add/remove/reorder items in this array. Only id, src, title are required.
// Images should live in /public/images and be referenced like "/images/filename.jpg".
export type Piece = {
  id: string | number;
  src: string;
  title: string;
  medium?: string;
  size?: string;
  year?: string;
  description?: string;
};

const pieces: Piece[] = [
  { id: 1, src: "/images/a1.jpg", title: "Untitled 1", medium: "Mixed media on canvas", size: "24” × 36”" },
  { id: 2, src: "/images/a2.jpg", title: "Untitled 2", medium: "Oil on linen", size: "30” × 40”" },
  { id: 4, src: "/images/a3.jpg", title: "Untitled 4", medium: "Watercolor on paper", size: "18” × 24”" },
  { id: 5, src: "/images/a2.jpg", title: "Untitled 5", medium: "Ink on paper", size: "22” × 30”" },
  { id: 6, src: "/images/a1.jpg", title: "Untitled 6", medium: "Charcoal on paper", size: "24” × 36”" },
  { id: 7, src: "/images/a2.jpg", title: "Untitled 7", medium: "Mixed media on canvas", size: "30” × 40”" },
  { id: 8, src: "/images/a3.jpg", title: "Untitled 8", medium: "Oil on linen", size: "20” × 24”" },
];

export const getStaticProps: GetStaticProps = async () => {
  const page = loadJSON('art.json');
  return { props: { page } };
};

export default function Art({ page }: { page: any }) {
  return (
    <Layout
      title={META.title}
      description={META.description}
      canonical={META.canonical}
    >
      <section className="section">
        <div className="container-wide">
          <h1 className="font-display text-3xl mb-6">{META.heading}</h1>
          {META.intro && (
            <p className="text-neutral-600 max-w-2xl mb-8">{META.intro}</p>
          )}

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {pieces.map((p) => (
              <article key={p.id} className="card overflow-hidden">
                <div className="relative aspect-[4/5]">
                  <Image src={p.src} alt={p.title} fill className="object-cover" />
                </div>
                <div className="p-4">
                  <div className="font-medium leading-tight">{p.title}</div>
                  <div className="text-sm text-neutral-600">
                    {[p.medium, p.size, p.year].filter(Boolean).join(" · ")}
                  </div>
                  {p.description && (
                    <p className="mt-2 text-sm text-neutral-700">{p.description}</p>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CMS-driven Art Gallery (auto-render if present) */}
      {Array.isArray(page?.gallery) && page.gallery.length > 0 && (
        <section className="section bg-white">
          <div className="container-wide grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {page.gallery.map((g: any, i: number) => (
              <div key={i} className="relative aspect-[16/11] rounded-2xl overflow-hidden shadow-soft">
                <Image
                  src={g.src}
                  alt={g.alt || ''}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </section>
      )}
    </Layout>
  );
}