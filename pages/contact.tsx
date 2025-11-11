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
            <>
              {/* Hidden iframe for Netlify form submission */}
              <iframe
                name="hidden_iframe"
                style={{ display: 'none' }}
                onLoad={() => {
                  if (submitted) return;
                  setSubmitted(true);
                }}
              ></iframe>

              <form
                name="contact"
                method="POST"
                data-netlify="true"
                action="/"
                target="hidden_iframe"
                className="card p-6 grid gap-4"
              >
                {/* Netlify form identification */}
                <input type="hidden" name="form-name" value="contact" />

                <label className="grid gap-2">
                  <span className="text-sm">Name</span>
                  <input
                    name="name"
                    required
                    className="rounded-xl border px-3 py-3"
                  />
                </label>

                <label className="grid gap-2">
                  <span className="text-sm">Email</span>
                  <input
                    name="email"
                    type="email"
                    required
                    className="rounded-xl border px-3 py-3"
                  />
                </label>

                <label className="grid gap-2">
                  <span className="text-sm">Message</span>
                  <textarea
                    name="message"
                    rows={5}
                    className="rounded-xl border px-3 py-3"
                  />
                </label>

                <button type="submit" className="btn btn-primary">
                  Send
                </button>
              </form>
            </>
          )}
        </div>
      </section>
    </Layout>
  );
}
