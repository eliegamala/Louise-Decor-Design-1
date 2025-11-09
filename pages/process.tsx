// pages/process.tsx
import { loadJSON } from '@/lib/content';
import CMSHeader from '@/components/CMSHeader';
import clsx from 'clsx';
import Image from 'next/image';
import Layout from '@/components/Layout';
import { GetStaticProps } from 'next';

const steps = [
  { title: 'Discovery', body: 'We learn your taste, lifestyle, and goals.' },
  { title: 'Design', body: 'We present mood boards, layouts, and finishes.' },
  { title: 'Procurement', body: 'We order, track, and manage logistics.' },
  { title: 'Installation', body: 'White-glove install and final styling.' },
];

// small helper for consistent images
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
  const page = loadJSON('process.json');
  return { props: { page } };
};

export default function ProcessPage() {
  return (
    <Layout title="Our process – Hayes Valley Interior Design" canonical="/process">
      {/* ORIGINAL STEPS — unchanged */}
      <section className="section bg-brand-light" id="steps">
        <div className="container-narrow">
          <h1 className="font-display text-3xl mb-6">Our process</h1>
          <div className="grid md:grid-cols-2 gap-6">
            {steps.map((s, i) => (
              <div key={s.title} className="card p-6">
                <div className="text-xs text-neutral-500 mb-2">
                  Step {(i + 1).toString().padStart(2, '0')}
                </div>
                <div className="font-display text-xl mb-2">{s.title}</div>
                <p className="text-neutral-600">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Intro — balanced image + copy */}
      <section className="section bg-white" id="overview">
        <div className="container-wide grid md:grid-cols-2 gap-10 items-center">
          <Img src="/images/row-1.jpg" alt="Design overview" />
          <div>
            <h2 className="font-display text-2xl mb-3">From idea to lived-in comfort</h2>
            <p className="text-neutral-600 mb-4">
              We combine classic design principles with your day-to-day realities—circulation,
              storage, light, and the tactile details that make a room feel like home.
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="rounded-2xl border border-neutral-200 p-4">
                <div className="text-sm font-medium text-neutral-900">Clarity at each step</div>
                <p className="text-xs text-neutral-600 mt-1">
                  You’ll know what’s next and why it matters.
                </p>
              </div>
              <div className="rounded-2xl border border-neutral-200 p-4">
                <div className="text-sm font-medium text-neutral-900">Timeless over trendy</div>
                <p className="text-xs text-neutral-600 mt-1">
                  Materials and forms that age gracefully.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case study — light visuals, strong narrative */}
      <section className="section bg-white" id="case">
        <div className="container-wide grid lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-5">
            <Img src="/images/featured.jpg" alt="Project material study" ratio="aspect-[4/3]" />
          </div>
          <div className="lg:col-span-7">
            <h2 className="font-display text-2xl mb-3">A kitchen that invites gathering</h2>
            <p className="text-neutral-600">
              In this compact home, we widened the circulation, introduced warm woods, and
              layered lighting to shift the mood from “task only” to “linger here.” Existing
              heirloom pieces were integrated to keep the space personal.
            </p>
            <div className="grid sm:grid-cols-2 gap-4 mt-5">
              <Img src="/images/featured-2.jpg" alt="Plan refinement" ratio="aspect-[16/11]" />
              <div className="rounded-3xl border border-neutral-200 p-5">
                <div className="text-sm font-medium text-neutral-900 mb-1">Key moves</div>
                <ul className="text-sm text-neutral-700 space-y-2">
                  <li>• Rebalanced task / ambient / accent lighting</li>
                  <li>• Durable finishes with soft handfeel</li>
                  <li>• Storage strategies that keep counters clear</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What to expect — text-led with a supporting image */}
      <section className="section bg-white" id="expect">
        <div className="container-wide grid md:grid-cols-3 gap-8 items-start">
          <div className="md:col-span-2">
            <h2 className="font-display text-2xl mb-3">What to expect</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="card p-5">
                <div className="text-sm font-medium text-neutral-900 mb-1">Decisions made simple</div>
                <p className="text-sm text-neutral-600">
                  Clear options with pros/cons, pricing, and visuals—no guesswork.
                </p>
              </div>
              <div className="card p-5">
                <div className="text-sm font-medium text-neutral-900 mb-1">Steady communication</div>
                <p className="text-sm text-neutral-600">
                  Weekly updates, milestone check-ins, and a single source of truth.
                </p>
              </div>
              <div className="card p-5">
                <div className="text-sm font-medium text-neutral-900 mb-1">Respect for your time</div>
                <p className="text-sm text-neutral-600">
                  Site visits are purposeful; presentations are concise and actionable.
                </p>
              </div>
              <div className="card p-5">
                <div className="text-sm font-medium text-neutral-900 mb-1">A polished reveal</div>
                <p className="text-sm text-neutral-600">
                  White-glove installation and final styling for that “ahh” moment.
                </p>
              </div>
            </div>
          </div>
          <Img src="/images/process/expect.jpg" alt="Expectations visual" ratio="aspect-[4/5]" />
        </div>
      </section>
    </Layout>
  );
}