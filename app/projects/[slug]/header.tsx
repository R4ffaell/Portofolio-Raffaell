import type { Project } from "contentlayer/generated";
import { ArrowLeft, ArrowUpRight, Eye } from "lucide-react";
import Link from "next/link";
import { compactNumber, formatDate, getProjectLinks } from "../../lib/projects";

export function Header({
  project,
  views,
}: {
  project: Project;
  views: number | null;
}) {
  const date = formatDate(project.date);
  const links = getProjectLinks(project);

  return (
    <header className="bg-alt">
      <div className="mx-auto max-w-3xl px-6 pb-14 pt-10 text-center sm:pb-20 sm:pt-14">
        <Link
          href="/projects"
          className="inline-flex items-center gap-1 text-sm text-accent hover:underline"
        >
          <ArrowLeft size={14} aria-hidden="true" />
          All projects
        </Link>

        <h1 className="mt-8 text-4xl font-semibold tracking-tighter sm:text-6xl">
          {project.title}
        </h1>
        <p className="mt-6 text-base leading-relaxed text-muted sm:text-lg">
          {project.description}
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-muted">
          {date && <time dateTime={date.iso}>{date.label}</time>}
          {views !== null && (
            <span className="inline-flex items-center gap-1" title="Page views">
              <Eye size={16} aria-hidden="true" />
              {compactNumber(views)}
              <span className="sr-only"> views</span>
            </span>
          )}
        </div>

        {links.length > 0 && (
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-full bg-fg px-5 py-2.5 text-sm font-medium text-canvas transition-opacity hover:opacity-85"
              >
                {link.label}
                <ArrowUpRight size={16} aria-hidden="true" />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
