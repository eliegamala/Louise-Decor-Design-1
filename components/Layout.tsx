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
}

export default function Layout({ title='Decor and Design Services | Interior Design in Cape Town
', description='Discover expert decor and design services in Cape Town. We offer personalized interior design solutions to transform your space beautifully.', children, image='/images/og.jpg', canonical='/' }: Props){
  const siteName = 'Louise Decor and Design';
  const url = `https://example.com${canonical}`;
  return (
    <div className={`${inter.variable} ${playfair.variable} font-sans`}>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={url} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={image} />
        <meta property="og:site_name" content={siteName} />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": siteName,
            "image": image,
            "address": { "@type": "PostalAddress", "addressLocality": "San Francisco", "addressRegion": "CA" },
            "url": url,
            "telephone": "+27 72 390 9235"
          })
        }} />
      </Head>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
