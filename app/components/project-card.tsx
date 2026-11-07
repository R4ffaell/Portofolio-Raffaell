import type { Project } from "contentlayer/generated";
import { ChevronRight, Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { compactNumber, formatDate, projectInitials } from "../lib/projects";

const imageClass =
  "object-cover transition-transform duration-700 group-hover:scale-105";

/**
 * Thumbnail with a gradient + initials placeholder underneath. If an image
 * is missing or fails to load (the `alt` is empty, so nothing is drawn),
 * the placeholder simply stays visible.
 */
export function ProjectThumb({
  project,
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
  className = "",
}: {
  project: Project;
  sizes?: string;
  className?: string;
}) {
  const { image } = project;
  return (
    <div
      className={`relative aspect-video overflow-hidden bg-gradient-to-br from-brand/25 via-fg/5 to-fg/10 ${className}`}
    >
      <span
        aria-hidden="true"
        className="absolute inset-0 flex select-none items-center justify-center text-6xl font-semibold tracking-tighter text-fg/15"
      >
        {projectInitials(project.title)}
      </span>
      {image?.startsWith("/") ? (
        <Image src={image} alt="" fill sizes={sizes} className={imageClass} />
      ) : image ? (
        // Remote (GitHub-hosted) screenshots: plain <img>, lazy and async-decoded.
        <img
          src={image}
          alt=""
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          className={`absolute inset-0 h-full w-full ${imageClass}`}
        />
      ) : null}
    </div>
  );
}

export function ProjectMeta({
  project,
  views,
}: {
  project: Project;
  views: number | null;
}) {
  const date = formatDate(project.date);
  return (
    <div className="flex items-center justify-between gap-2 text-xs text-muted">
      {date ? <time dateTime={date.iso}>{date.label}</time> : <span>Coming soon</span>}
      {views !== null && (
        <span className="inline-flex items-center gap-1">
          <Eye size={14} aria-hidden="true" />
          {compactNumber(views)}
          <span className="sr-only"> views</span>
        </span>
      )}
    </div>
  );
}

export function ProjectCard({
  project,
  views = null,
}: {
  project: Project;
  views?: number | null;
}) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-3xl bg-card transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/10"
    >
      <ProjectThumb project={project} />
      <div className="flex flex-1 flex-col p-6">
        <ProjectMeta project={project} views={views} />
        <h3 className="mt-3 text-xl font-semibold leading-snug tracking-tight">
          {project.title}
        </h3>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">
          {project.description}
        </p>
        <span className="mt-auto inline-flex items-center gap-1 pt-5 text-sm text-accent">
          Learn more
          <ChevronRight
            size={14}
            aria-hidden="true"
            className="transition-transform group-hover:translate-x-0.5"
          />
        </span>
      </div>
    </Link>
  );
}
