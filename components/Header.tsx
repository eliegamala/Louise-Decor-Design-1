// components/Header.tsx
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import clsx from "clsx";

const NavLink = ({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}) => {
  const { pathname } = useRouter();
  const active = pathname === href;
  return (
    <Link
      href={href}
      onClick={onClick}
      className={clsx(
        "block text-sm md:text-[15px] px-3 py-2 rounded-lg hover:bg-brand-light",
        active && "text-brand-pink font-semibold"
      )}
    >
      {children}
    </Link>
  );
};

export default function Header() {
  const [open, setOpen] = useState(false);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (open) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 bg-white/85 backdrop-blur border-b border-neutral-200">
      <div className="container-wide h-[var(--header-height)] flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/images/logo.webp"
            alt="Hayes Valley"
            width={100}
            height={32}
            priority
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center">
          <NavLink href="/">Homepage</NavLink>
          <NavLink href="/portfolio">Portfolio</NavLink>
          <NavLink href="/process">Our process</NavLink>
          <NavLink href="/art">Art</NavLink>
          <NavLink href="/contact">Contact us</NavLink>
        </nav>

        {/* Mobile toggle */}
        <button
          type="button"
          className="md:hidden inline-flex items-center justify-center rounded-lg px-3 py-2 hover:bg-brand-light focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-pink"
          aria-label="Toggle menu"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {/* Icon */}
          <svg
            className="h-6 w-6"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            {/* Hamburger */}
            <path
              className={clsx(
                "transition-opacity",
                open ? "opacity-0" : "opacity-100"
              )}
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              d="M4 7h16M4 12h16M4 17h16"
            />
            {/* X */}
            <path
              className={clsx(
                "transition-opacity",
                open ? "opacity-100" : "opacity-0"
              )}
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              d="M6 6l12 12M18 6l-12 12"
            />
          </svg>
        </button>
      </div>

      {/* Mobile menu (slide-down) */}
      <div
        id="mobile-nav"
        className={clsx(
          "md:hidden overflow-hidden border-t border-neutral-200/70",
          open ? "max-h-[60vh]" : "max-h-0"
        )}
        aria-hidden={!open}
      >
        <div
          className={clsx(
            "container-wide py-2 grid",
            "transition-all duration-300 ease-out",
            open ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1"
          )}
        >
          <NavLink href="/" onClick={() => setOpen(false)}>
            Homepage
          </NavLink>
          <NavLink href="/portfolio" onClick={() => setOpen(false)}>
            Portfolio
          </NavLink>
          <NavLink href="/process" onClick={() => setOpen(false)}>
            Our process
          </NavLink>
          <NavLink href="/art" onClick={() => setOpen(false)}>
            Art
          </NavLink>
          <NavLink href="/contact" onClick={() => setOpen(false)}>
            Contact us
          </NavLink>
        </div>
      </div>
    </header>
  );
}
