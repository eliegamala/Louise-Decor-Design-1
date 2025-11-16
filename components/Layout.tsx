import Head from 'next/head';
import { inter, playfair } from './Fonts';
import Header from './Header';
import Footer from './Footer';

type Props = {
  title?: string;
  description?: string;
  children: React.ReactNode;
  image?: string;
  canonical?: string;
};

export default function Layout({
  title = 'Decor and Design Services | Interior Design in Cape Town',
  description = 'Discover expert decor and design services in Cape Town. We offer personalized interior design solutions to transform your space beautifully.',
  children,
  image = '/images/og.jpg',
  canonical = '/',
}: Props): JSX.Element {
  const siteName = 'Louise Decor and Design';
  const baseUrl = 'https://louise-decor-and-design.netlify.app';
  const url = `${baseUrl}${canonical}`;
  const imageUrl = image.startsWith('http') ? image : `${baseUrl}${image}`;

  const ldJson = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: siteName,
    image: imageUrl,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Cape Town',
      addressRegion: 'Western Cape',
    },
    url,
    telephone: '+27 72 390 9235',
  };

  return (
    <div className={`${inter.variable} ${playfair.variable} font-sans`}>
      <Head>
        <title>{title}</title>

        {/* Basic SEO */}
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={url} />

        {/* Open Graph */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:url" content={url} />
        <meta property="og:site_name" content={siteName} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={imageUrl} />

        {/* LocalBusiness Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ldJson) }}
        />

        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-9WSQ1CJVDV" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-9WSQ1CJVDV');
            `,
          }}
        />
      </Head>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
