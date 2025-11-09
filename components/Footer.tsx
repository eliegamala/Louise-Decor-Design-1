import Link from 'next/link';
import Image from "next/image";


export default function Footer(){
  return (
    <footer className="bg-brand-light mt-24 border-t">
      <div className="container-narrow py-16 text-sm">
      
            {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/images/logo.webp"
            alt="decor & design"
            width={100}
            height={32}
            priority
          />
        </Link>

        <div className="grid sm:grid-cols-2 gap-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <div className="font-medium mb-2">Navigate</div>
              <ul className="space-y-1">
                <li><Link href="/" className="link-underline">Homepage</Link></li>
                <li><Link href="/portfolio" className="link-underline">Portfolio</Link></li>
                <li><Link href="/process" className="link-underline">Our process</Link></li>
                <li><Link href="/art" className="link-underline">Art</Link></li>
              </ul>
            </div>
            <div>
              <div className="font-medium mb-2">Location</div>
              <ul className="space-y-1">
                <li>62 Lower Main Rd</li>
                <li>Observatory, Cape Town, 7925</li>
                <li>Mon–Fri, 10:30–5:30 p.m.</li>
                <li>+27 72 390 9235</li>
              </ul>
            </div>
          </div>
          <div className="flex items-end sm:justify-end">
            <Link href="/contact" className="btn btn-primary">Let’s chat</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
