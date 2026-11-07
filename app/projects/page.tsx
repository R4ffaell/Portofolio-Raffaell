import { ChevronRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  ProjectCard,
  ProjectMeta,
  ProjectThumb,
} from "../components/project-card";
import { Reveal } from "../components/reveal";
import { PINNED_SLUG, getPublishedProjects } from "../lib/projects";
import { getViews } from "../lib/views";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Computer vision, machine learning and data projects by Anakta Raffaell.",
};

// Re-render at most once a minute so view counts stay fresh.
export const revalidate = 60;

export default async function ProjectsPage() {
  const projects = getPublishedProjects();
  const views = await getViews(projects.map((p) => p.slug));

  const hero =
    projects.find((p) => p.slug === PINNED_SLUG) ??
    projects.find((p) => p.featured) ??
    projects[0];
  // Featured first; the sort is stable, so each group stays newest-first.
  const rest = projects
    .filter((p) => p !== hero)
    .sort((a, b) => Number(b.featured) - Number(a.featured));

  return (
    <div className="mx-auto max-w-6xl px-6 pb-28 pt-20 sm:pt-28">
      <header>
        <h1 className="animate-fade-up text-5xl font-semibold tracking-tighter sm:text-7xl">
          Projects.
        </h1>
        <p
          className="animate-fade-up mt-6 max-w-2xl text-xl leading-relaxed text-muted"
          style={{ animationDelay: "120ms" }}
        >
          Some of the projects are from work and some are on my own time.
        </p>
      </header>

      {hero && (
        <Reveal className="mt-14">
          <Link
            href={`/projects/${hero.slug}`}
            className="group grid overflow-hidden rounded-3xl bg-card transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/10 lg:grid-cols-2"
          >
            <ProjectThumb
              project={hero}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="lg:aspect-auto lg:min-h-[22rem]"
            />
            <div className="flex flex-col justify-center p-8 sm:p-12">
              <ProjectMeta project={hero} views={views ? (views[hero.slug] ?? 0) : null} />
              <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                {hero.title}
              </h2>
              <p className="mt-4 line-clamp-4 leading-relaxed text-muted">
                {hero.description}
              </p>
              <span className="mt-6 inline-flex items-center gap-1 text-accent">
                Read more
                <ChevronRight
                  size={16}
                  aria-hidden="true"
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </span>
            </div>
          </Link>
        </Reveal>
      )}

      <section aria-labelledby="all-projects" className="mt-20">
        <h2 id="all-projects" className="text-2xl font-semibold tracking-tight">
          All projects
        </h2>
        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((project, i) => (
            <li key={project.slug}>
              <Reveal className="h-full" delay={(i % 3) * 80}>
                <ProjectCard
                  project={project}
                  views={views ? (views[project.slug] ?? 0) : null}
                />
              </Reveal>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
