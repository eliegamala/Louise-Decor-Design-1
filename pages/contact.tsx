import { loadJSON } from '@/lib/content';
import CMSHeader from '@/components/CMSHeader';
import Layout from '@/components/Layout';
import type { GetStaticProps } from 'next';

export const getStaticProps: GetStaticProps = async () => {
  const page = loadJSON('contact.json');
  return { props: { page } };
};

export default function ContactPage({ page }: any) {
  return (
    <Layout>
      <CMSHeader data={page} />
      <section className="section">
        <div className="container-narrow">
          <h1 className="font-display text-3xl mb-6">
            {page?.heading ?? 'Contact our team'}
          </h1>
          <p className="text-neutral-600 mb-8">{page?.intro ?? ' '}</p>
          <form
            className="card p-6 grid gap-4"
            action="https://formspree.io/f/xqakzgjk"
            method="POST"
          >
            <label className="grid gap-2">
              <span className="text-sm">Name</span>
              <input name="name" required className="rounded-xl border px-3 py-3" />
            </label>
            <label className="grid gap-2">
              <span className="text-sm">Email address</span>
              <input
                name="email"
                type="email"
                required
                className="rounded-xl border px-3 py-3"
              />
            </label>
            <label className="grid gap-2">
              <span className="text-sm">Message (optional)</span>
              <textarea name="message" rows={5} className="rounded-xl border px-3 py-3" />
            </label>
            <button className="btn btn-primary">Submit</button>
          </form>
        </div>
      </section>
    </Layout>
  );
}