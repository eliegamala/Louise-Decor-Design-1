import { useState } from 'react';
import { loadJSON } from '@/lib/content';
import CMSHeader from '@/components/CMSHeader';
import Layout from '@/components/Layout';
import type { GetStaticProps } from 'next';

export const getStaticProps: GetStaticProps = async () => {
  const page = loadJSON('contact.json');
  return { props: { page } };
};

export default function ContactPage({ page }: any) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const form = e.currentTarget;
    const data = new FormData(form);
    // Netlify requires form-name in the payload
    if (!data.get('form-name')) data.set('form-name', 'contact');

    try {
      await fetch('/__forms.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(data as any).toString(),
      });
      setSubmitted(true);
      form.reset();
    } catch (err: any) {
      setError('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Layout>
      <CMSHeader data={page} />
      <section className="section">
        <div className="container-narrow">
          <p className="text-neutral-600 mb-8">{page?.intro ?? ' '}</p>

          {submitted ? (
            <div className="card p-6 text-center">
              <h2 className="text-2xl font-semibold mb-4">Thank you!</h2>
              <p>Your message has been sent. We’ll get back to you shortly.</p>
            </div>
          ) : (
            <form
              name="contact"
              onSubmit={handleSubmit}
              className="card p-6 grid gap-4"
              // NOTE: no data-netlify attribute here anymore
            >
              <input type="hidden" name="form-name" value="contact" />
              {/* honeypot for spam */}
              <input type="text" name="bot-field" className="hidden" tabIndex={-1} autoComplete="off" />

              <label className="grid gap-2">
                <span className="text-sm">Name</span>
                <input name="name" required className="rounded-xl border px-3 py-3" />
              </label>

              <label className="grid gap-2">
                <span className="text-sm">Email address</span>
                <input name="email" type="email" required className="rounded-xl border px-3 py-3" />
              </label>

              <label className="grid gap-2">
                <span className="text-sm">Message (optional)</span>
                <textarea name="message" rows={5} className="rounded-xl border px-3 py-3" />
              </label>

              {error && <p className="text-red-600 text-sm">{error}</p>}

              <button type="submit" className="btn btn-primary" disabled={submitting}>
                {submitting ? 'Submitting…' : 'Submit'}
              </button>
            </form>
          )}
        </div>
      </section>
    </Layout>
  );
}
