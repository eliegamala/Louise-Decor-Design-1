import { loadJSON } from '@/lib/content';
import { loadFolder } from '@/lib/content';
import CMSHeader from '@/components/CMSHeader';
import Image from "next/image";
import clsx from "clsx";

/**
 * Manually add/edit your projects here.
 * - id: unique slug
 * - title: main title
 * - subtext: short subtitle shown on the card
 * - cover: the card/hero image
 * - images: optional gallery images for the modal (first can be same as cover)
 * - description: short paragraph for the modal
 * - meta: extra info rendered in the modal (location, year, scope, etc.)
 */
type Project = {
  id: string;
  title: string;
  subtext?: string;
  cover: string;
  images?: string[];
  description?: string;
  meta?: Record<string, string>;
};

const projects: Project[] = [
  {
    id: "res-01",
    title: "Residence 01",
    subtext: "Kitchen & living refresh",
    cover: "/images/project-1.jpg",
    images: ["/images/project-1.jpg", "/images/project-2.jpg", "/images/project-3.jpg"],
    description:
      "A warm, layered update balancing durable finishes with a softer lighting plan. Storage was rethought to clear counters and invite gathering.",
    meta: { Location: "Cape Town", Year: "2025", Scope: "Full-service Design" },
  },
  {
    id: "res-02",
    title: "Residence 02",
    subtext: "Calm bedroom suite",
    cover: "/images/project-2.jpg",
    images: ["/images/project-2.jpg", "/images/project-1.jpg"],
    description:
      "Quiet textures and a restrained palette to shift the energy of rest. Window treatments and lighting create a day-to-night transition.",
    meta: { Location: "Johannesburg", Year: "2024", Scope: "Furnishings & Styling" },
  },
  {
    id: "res-03",
    title: "Residence 03",
    subtext: "Family living room",
    cover: "/images/project-3.jpg",
    images: ["/images/project-3.jpg", "/images/project-2.jpg"],
    description:
      "Comfort-first seating, kid-friendly materials, and layered light. Heirloom pieces integrated to keep the space personal.",
    meta: { Location: "Stellenbosch", Year: "2024", Scope: "Room Refresh" },
  },
  // add more…
];

import type { GetStaticProps } from 'next';
import { useEffect, useState } from 'react';
import Layout from '@/components/Layout';

export const getStaticProps: GetStaticProps = async () => {
  const page = loadJSON('portfolio.json');
  const projects = loadFolder('portfolio');
  return { props: { page, projects } };
};

export default function Portfolio(): JSX.Element {
  const [active, setActive] = useState<Project | null>(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    document.documentElement.style.overflow = active ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [active]);

  return (
    <Layout
      title="Portfolio – Hayes Valley Interior Design"
      description="Selected interior design projects by Hayes Valley Interior Design."
      canonical="/portfolio"
    >
      <section className="section">
        <div className="container-wide">
          <h1 className="font-display text-3xl mb-6">Portfolio</h1>

          {/* Grid of cards */}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {projects.map((p) => (
              <button
                key={p.id}
                className="group card overflow-hidden text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-pink"
                onClick={() => setActive(p)}
                aria-label={`Open ${p.title}`}
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={p.cover}
                    alt={p.title}
                    fill
                    className="object-cover transition scale-100 group-hover:scale-105"
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    priority={false}
                  />
                </div>
                <div className="p-4">
                  <div className="font-medium">{p.title}</div>
                  {p.subtext && (
                    <div className="text-sm text-neutral-600">{p.subtext}</div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {active && (
        <Modal onClose={() => setActive(null)} title={active.title}>
          <ProjectDetail project={active} />
        </Modal>
      )}
    </Layout>
  );
}

/* =========================
   Modal (accessible, no libs)
   ========================= */
function Modal({
  children,
  onClose,
  title,
}: {
  children: React.ReactNode;
  onClose: () => void;
  title?: string;
}) {
  // ESC to close
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-label={title || "Project details"}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      {/* Dialog */}
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-5xl w-[92vw] max-h-[88vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-200 px-5 py-4">
          <div className="font-display text-lg">{title}</div>
          <button
            className="rounded-lg p-2 hover:bg-neutral-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-pink"
            onClick={onClose}
            aria-label="Close"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M6 6l12 12M18 6l-12 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Body (scrollable) */}
        <div className="overflow-y-auto p-5 md:p-6">
          {children}
        </div>
      </div>
    </div>
  );
}

/* =========================
   Project detail content
   ========================= */
function ProjectDetail({ project }: { project: Project }) {
  const { cover, images, description, meta, subtext, title } = project;
  const gallery = images && images.length ? images : [cover];

  return (
    <div className="grid lg:grid-cols-12 gap-6 items-start">
      {/* Left: Image/Gallery */}
      <div className="lg:col-span-7">
        <div className="relative overflow-hidden rounded-2xl shadow-soft aspect-[16/11]">
          <Image
            src={gallery[0]}
            alt={title}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 60vw, 100vw"
            priority
          />
        </div>

        {/* Thumbs (if multiple) */}
        {gallery.length > 1 && (
          <div className="grid grid-cols-3 gap-3 mt-3">
            {gallery.slice(1, 7).map((src, i) => (
              <div key={src + i} className="relative overflow-hidden rounded-xl aspect-[4/3]">
                <Image src={src} alt={`${title} ${i + 2}`} fill className="object-cover" />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Right: Copy + Meta */}
      <div className="lg:col-span-5">
        {subtext && <div className="text-sm text-neutral-500 mb-1">{subtext}</div>}
        <h3 className="font-display text-xl mb-2">{title}</h3>
        {description && <p className="text-neutral-700 mb-4">{description}</p>}

        {meta && (
          <div className="grid grid-cols-2 gap-3">
            {Object.entries(meta).map(([k, v]) => (
              <div key={k} className="rounded-2xl border border-neutral-200 p-3">
                <div className="text-xs text-neutral-500">{k}</div>
                <div className="text-sm text-neutral-900">{v}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}