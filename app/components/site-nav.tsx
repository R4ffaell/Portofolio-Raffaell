"use client";

import { Github } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "../lib/site";
import { ThemeToggle } from "./theme-toggle";

const links = [
  { name: "Experience", href: "/experience" },
  { name: "Projects", href: "/projects" },
  { name: "Contact", href: "/contact" },
];

export function SiteNav() {
  const pathname = usePathname();

  return (
    <header className="glass fixed inset-x-0 top-0 z-50 border-b">
      <nav
        aria-label="Main"
        className="mx-auto flex h-12 max-w-5xl items-center justify-between px-6 text-xs"
      >
        <Link href="/" aria-label="AR, home" className="text-sm font-semibold tracking-tight">
          AR
        </Link>
        <ul className="flex items-center gap-4 text-muted sm:gap-7">
          {links.map((link) => {
            const active = pathname === link.href || pathname?.startsWith(`${link.href}/`);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`transition-colors hover:text-fg ${active ? "text-fg" : ""}`}
                >
                  {link.name}
                </Link>
              </li>
            );
          })}
          <li>
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile (opens in a new tab)"
              className="inline-flex h-7 w-7 items-center justify-center rounded-full transition-colors hover:bg-fg/10 hover:text-fg"
            >
              <Github size={16} aria-hidden="true" />
            </a>
          </li>
          <li>
            <ThemeToggle />
          </li>
        </ul>
      </nav>
    </header>
  );
}
