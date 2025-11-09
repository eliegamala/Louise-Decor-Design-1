import Layout from '@/components/Layout';
))}
</section>


{/* Parallax section — now uses its own image + editable cards */}
<Parallax image={home.parallax?.image}>
<div className="grid md:grid-cols-2 gap-6">
{home.parallax?.cards?.map((c: any, i: number) => (
<div key={i} className="card p-6">
<h3 className="font-display text-2xl mb-2">{c.title}</h3>
<p className="text-neutral-600">{c.text}</p>
{c.ctaLabel && (
<Link
href={c.href}
className={clsx('btn mt-4', c.variant === 'primary' ? 'btn-primary' : 'btn-ghost')}
>
{c.ctaLabel}
</Link>
)}
</div>
))}
</div>
</Parallax>


{/* About Me */}
<AboutMe
hero={home.about.hero}
detail1={home.about.detail1}
detail2={home.about.detail2}
headshot={home.about.headshot}
/>


{/* Featured project — all text/images editable */}
<section className="section bg-white">
<div className="container-wide grid lg:grid-cols-12 gap-6 items-start">
<div className="lg:col-span-5">
<Img src={home.featured.mainImage} alt="Featured" ratio="aspect-[4/3]" />
</div>
<div className="lg:col-span-7">
<h2 className="font-display text-2xl mb-3">{home.featured.title}</h2>
<p className="text-neutral-600">{home.featured.body}</p>
<div className="grid sm:grid-cols-2 gap-4 mt-5">
<Img src={home.featured.secondaryImage} alt="Secondary visual" ratio="aspect-[16/11]" />
<div className="rounded-3xl border border-neutral-200 p-5">
<div className="text-sm font-medium text-neutral-900 mb-1">Key moves</div>
<ul className="text-sm text-neutral-700 space-y-2">
{home.featured.keyMoves?.map((item: string, i: number) => (
<li key={i}>• {item}</li>
))}
</ul>
<Link href={home.featured.ctaHref} className="btn btn-ghost mt-4">
{home.featured.ctaLabel ?? 'View project'}
</Link>
</div>
</div>
</div>
</div>
</section>


{/* Services */}
<section className="section bg-white">
<div className="container-wide grid md:grid-cols-3 gap-8 items-start">
<div className="md:col-span-2">
<h2 className="font-display text-2xl mb-3">{home.servicesMeta?.heading ?? 'Services at a glance'}</h2>
<div className="grid sm:grid-cols-2 gap-4">
{home.services?.map((s: Service, i: number) => (
<div key={i} className={clsx('card p-5', s.emphasis && 'ring-1 ring-neutral-300') }>
<div className="text-sm font-medium text-neutral-900 mb-1">{s.title}</div>
<p className="text-sm text-neutral-600">{s.body}</p>
</div>
))}
</div>
<Link href={home.servicesMeta?.ctaHref ?? '/contact'} className="btn btn-primary mt-6">
{home.servicesMeta?.ctaLabel ?? 'Start a project'}
</Link>
</div>
<Img src={home.servicesImage.src} alt={home.servicesImage.alt} ratio="aspect-[4/5]" />
</div>
</section>
</Layout>
);
}
