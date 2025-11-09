import React from 'react';

export default function CMSHeader({ data }: { data?: { heading?: string; intro?: string; seo?: { title?: string } } }) {
  if (!data || (!data.heading && !data.intro)) return null;
  return (
    <section className="section bg-white">
      <div className="container-wide max-w-4xl">
        {data.heading ? <h1 className="font-display text-3xl mb-2">{data.heading}</h1> : null}
        {data.intro ? <p className="text-neutral-600">{data.intro}</p> : null}
      </div>
    </section>
  );
}
