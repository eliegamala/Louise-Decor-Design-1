import { useState, useEffect } from 'react';
import { loadJSON } from '@/lib/content';
import CMSHeader from '@/components/CMSHeader';
import Layout from '@/components/Layout';
import Head from 'next/head'; // Added Head for SEO
import type { GetStaticProps } from 'next';

export const getStaticProps: GetStaticProps = async () => {
  const page = loadJSON('contact.json');
  return { props: { page } };
};

export default function ContactPage({ page }: any) {
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // Check for success parameter in URL on component mount
    if (window.location.search.includes('success=true')) {
      setSuccess(true);
      // Optional: Clear the URL parameter without reloading the page
      // window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  return (
    <Layout>
      <Head>
        {/* Add title and meta tags as needed */}
        <title>{page?.title || 'Contact'} - Your Site Name</title>
      </Head>
      <CMSHeader data={page} />
      {/* Add a custom class to reduce top padding on this specific section */}
      <section className="section section-contact-form">
        <div className="container-narrow">
          <p className="text-neutral-600 mb-8">{page?.intro ?? ' '}</p>

          {success ? (
            <div className="card p-6 text-center">
              <h2 className="text-2xl font-semibold mb-4">Thank you!</h2>
              <p>Your message has been sent. We’ll get back to you shortly.</p>
            </div>
          ) : (
            <form
              name="contact"
              method="POST"
              action="/contact?success=true" // Updated action path to match the page URL
              data-netlify="true"
              className="card p-6 grid gap-4"
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

              {/* Removed error state handling as Netlify handles errors differently */}

              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          )}
        </div>
      </section>
    </Layout>
  );
}
