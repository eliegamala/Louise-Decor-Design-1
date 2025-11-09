import Image from 'next/image';
import Link from 'next/link';

export default function Hero(){
  return (
    <section className="bg-brand-light">
      <div className="container-wide grid md:grid-cols-2 gap-10 items-center py-12 md:py-16">
        <div className="relative aspect-[16/11] md:aspect-[16/10] rounded-3xl overflow-hidden shadow-soft">
          <Image src="/images/louiswall.jpg" alt="Living room showcase" fill priority className="object-cover" />
        </div>
        <div>
          <h1 className="font-display text-3xl md:text-4xl leading-tight mb-4">We make homes look beautiful.</h1>
          <p className="text-neutral-600 mb-6">We’re a San Francisco interior design studio crafting calm, light-filled spaces with personality.</p>
          <div className="flex gap-3">
            <Link href="/contact" className="btn btn-primary">Let’s chat</Link>
            <Link href="/portfolio" className="btn btn-ghost">See our work</Link>
          </div>
        </div>
      </div>
    </section>
  )
}
