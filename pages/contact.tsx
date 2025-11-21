import { useState, useEffect } from 'react';
import { loadJSON } from '@/lib/content';
import CMSHeader from '@/components/CMSHeader';
import Layout from '@/components/Layout';
import Head from 'next/head';
import type { GetStaticProps } from 'next';

export const getStaticProps: GetStaticProps = async () => {
  const page = loadJSON('contact.json');
  return { props: { page } };
};

export default function ContactPage({ page }: any) {
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (window.location.search.includes('success=true')) {
      setSuccess(true);
    }
  }, []);

  const phone = page?.phone;
  const email = page?.email;
  const address = page?.address;
  const whatsappNumber = page?.whatsappNumber; // e.g. "27721234567"
  const storeUrl = page?.storeUrl || '/store';
  const storeName = page?.storeName || 'Our store';

  const whatsappHref = whatsappNumber
    ? `https://wa.me/${whatsappNumber}`
    : 'https://wa.me/';

  const encodedAddress = address ? encodeURIComponent(address) : '';

  return (
    <Layout>
      <Head>
        <title>{page?.title || 'Contact'} - Your Site Name</title>
      </Head>

      <CMSHeader data={page} />

      <section className="section section-contact-form">
        <div className="container-narrow">
          <p className="text-neutral-600 mb-8">
            {page?.intro ?? ' '}
          </p>

          {/* Two-column layout */}
          <div className="grid gap-8 md:grid-cols-[minmax(0,2fr)_minmax(0,1.4fr)] items-start">
            {/* LEFT: form / success */}
            <div>
              {success ? (
                <div className="card p-6 text-center">
                  <h2 className="text-2xl font-semibold mb-4">Thank you!</h2>
                  <p>Your message has been sent. We’ll get back to you shortly.</p>
                </div>
              ) : (
                <form
                  name="contact"
                  method="POST"
                  action="/contact?success=true"
                  data-netlify="true"
                  className="card p-6 grid gap-4"
                >
                  <input type="hidden" name="form-name" value="contact" />
                  {/* honeypot */}
                  <input
                    type="text"
                    name="bot-field"
                    className="hidden"
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  <label className="grid gap-2">
                    <span className="text-sm">Name</span>
                    <input
                      name="name"
                      required
                      className="rounded-xl border px-3 py-3"
                    />
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
                    <textarea
                      name="message"
                      rows={5}
                      className="rounded-xl border px-3 py-3"
                    />
                  </label>

                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </form>
              )}
            </div>

            {/* RIGHT: contact info + WhatsApp + map */}
            <aside className="space-y-6">
              {/* Contact information */}
              <div className="card p-6">
                <h2 className="text-xl font-semibold mb-4">Contact information</h2>

                <div className="space-y-2 text-sm text-neutral-700">
                  {phone && (
                    <p>
                      <span className="font-medium">Phone: </span>
                      <a href={`tel:${phone}`} className="underline">
                        {phone}
                      </a>
                    </p>
                  )}

                  {email && (
                    <p>
                      <span className="font-medium">Email: </span>
                      <a href={`mailto:${email}`} className="underline">
                        {email}
                      </a>
                    </p>
                  )}

                  {address && (
                    <p>
                      <span className="font-medium">Address: </span>
                      <span>{address}</span>
                    </p>
                  )}

                  {page?.hours && (
                    <p>
                      <span className="font-medium">Hours: </span>
                      <span>{page.hours}</span>
                    </p>
                  )}
                </div>

                {/* WhatsApp button */}
                <div className="mt-6">
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary w-full text-center"
                  >
                    Chat with us on WhatsApp
                  </a>
                </div>
              </div>

              {/* Visit our store MAP */}
              <div className="card p-6">
                <h3 className="text-lg font-semibold mb-3">Visit our store</h3>

                {address ? (
                  <>
                    <p className="text-sm text-neutral-700 mb-3">
                      Find {storeName.toLowerCase()} on the map below:
                    </p>

                    <div className="relative w-full overflow-hidden rounded-xl border">
                      <div className="aspect-[4/3] w-full">
                        <iframe
                          title="Store location map"
                          src={`https://www.google.com/maps?q=${encodedAddress}&output=embed`}
                          style={{ border: 0 }}
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                          className="h-full w-full"
                        />
                      </div>
                    </div>

                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline w-full text-center mt-4"
                    >
                      Open in Google Maps
                    </a>
                  </>
                ) : (
                  <>
                    <p className="text-sm text-neutral-700 mb-4">
                      Our store address will appear here.
                    </p>
                    <a href={storeUrl} className="btn btn-outline w-full text-center">
                      Visit our store
                    </a>
                  </>
                )}
              </div>
            </aside>
          </div>
        </div>
      </section>
    </Layout>
  );
}
