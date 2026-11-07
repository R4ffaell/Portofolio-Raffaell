import {
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
  type LucideIcon,
} from "lucide-react";
import type { Metadata } from "next";
import { CopyButton } from "../components/copy-button";
import { Reveal } from "../components/reveal";
import { site } from "../lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Anakta Raffaell Tambunan.",
};

function SocialCard({
  icon: Icon,
  label,
  handle,
  href,
  action,
}: {
  icon: LucideIcon;
  label: string;
  handle: string;
  href: string;
  action: string;
}) {
  return (
    <section
      aria-label={label}
      className="flex flex-col rounded-3xl bg-card p-8 sm:p-10"
    >
      <div className="flex items-center gap-3 text-muted">
        <Icon size={20} aria-hidden="true" />
        <h2 className="text-sm font-medium">{label}</h2>
      </div>
      <p className="mt-4 break-words text-2xl font-semibold tracking-tight">{handle}</p>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 inline-flex items-center gap-1 self-start text-accent hover:underline"
      >
        {action}
        <ArrowUpRight size={16} aria-hidden="true" />
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    </section>
  );
}

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 pb-28 pt-20 sm:pt-28">
      <header>
        <h1 className="animate-fade-up text-5xl font-semibold tracking-tighter sm:text-7xl">
          Get in touch.
        </h1>
        <p
          className="animate-fade-up mt-6 max-w-2xl text-xl leading-relaxed text-muted"
          style={{ animationDelay: "120ms" }}
        >
          Open to conversations about AI, data, and computer vision. Based in{" "}
          {site.location}.
        </p>
      </header>

      <div className="mt-14 grid gap-4 sm:grid-cols-2">
        <Reveal className="sm:col-span-2">
          <section aria-labelledby="email-heading" className="rounded-3xl bg-card p-8 sm:p-12">
            <div className="flex items-center gap-3 text-muted">
              <Mail size={20} aria-hidden="true" />
              <h2 id="email-heading" className="text-sm font-medium">
                Email
              </h2>
            </div>
            <a
              href={`mailto:${site.email}`}
              className="mt-4 block break-all text-2xl font-semibold tracking-tight transition-colors hover:text-accent sm:text-4xl"
            >
              {site.email}
            </a>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${site.email}`}
                className="rounded-full bg-brand px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-brand/85"
              >
                Send email
              </a>
              <CopyButton text={site.email} />
            </div>
          </section>
        </Reveal>

        <Reveal className="h-full" delay={80}>
          <SocialCard
            icon={Linkedin}
            label="LinkedIn"
            handle="Anakta Raffaell"
            href={site.linkedin}
            action="Visit LinkedIn"
          />
        </Reveal>
        <Reveal className="h-full" delay={160}>
          <SocialCard
            icon={Github}
            label="GitHub"
            handle="R4ffaell"
            href={site.github}
            action="View GitHub"
          />
        </Reveal>
      </div>
    </div>
  );
}
