"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

const links = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

type Tone = "white" | "pink" | "yellow";

export function Screen({ tone, children }: { tone: Tone; children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className={`screen screen--${tone}`}>
      <header className="masthead">
        <Link href="/" className="masthead-name" aria-current={pathname === "/" ? "page" : undefined}>
          Filip Maczka
        </Link>
        <nav className="masthead-nav" aria-label="Main">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={pathname.startsWith(link.href) ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </header>
      {children}
    </div>
  );
}
