import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { ProjectCard } from "./components/project-card";
import { Reveal } from "./components/reveal";
import { ScrollText } from "./components/scroll-text";
import { highlights, jobs, technologies } from "./lib/profile";
import { getFeaturedProjects } from "./lib/projects";
import { site } from "./lib/site";

const ABOUT =
  "Computer Engineering graduate. Now delivering AI for enterprise clients, with end-to-end ownership from requirements to deployment.";

export default function Home() {
  const featured = getFeaturedProjects(4);

  return (
    <>
      {/* Hero */}
      <section className="hero-h hero-glow relative flex flex-col items-center justify-center overflow-hidden px-6 text-center">
        <p
          className="animate-fade-up text-lg font-medium text-accent sm:text-xl"
          style={{ animationDelay: "0ms" }}
        >
          Analyst, AI & Data · Deloitte Indonesia
        </p>
        <h1
          className="animate-fade-up mt-4 bg-gradient-to-b from-fg to-muted bg-clip-text pb-2 text-5xl font-semibold tracking-tighter text-transparent sm:text-7xl md:text-8xl"
          style={{ animationDelay: "100ms" }}
        >
          {site.name}.
        </h1>
        <p
          className="animate-fade-up mt-6 max-w-2xl text-xl leading-relaxed text-muted sm:text-2xl"
          style={{ animationDelay: "220ms" }}
        >
          Building LLM workflows, cloud data pipelines, and computer vision
          systems that ship.
        </p>
        <div
          className="animate-fade-up mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4"
          style={{ animationDelay: "340ms" }}
        >
          <Link
            href="/projects"
            className="rounded-full bg-brand px-6 py-3 text-base font-medium text-white transition-colors hover:bg-brand/85"
          >
            View projects
          </Link>
          <a
            href={site.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-base text-accent hover:underline"
          >
            Resume
            <span className="sr-only"> (opens in a new tab)</span>
            <ChevronRight size={16} aria-hidden="true" />
          </a>
        </div>
      </section>

      {/* Technologies */}
      <section aria-label="Technologies" className="border-y py-8">
        <div className="marquee">
          <ul className="marquee-track">
            {[0, 1].map((copy) =>
              technologies.map((tech) => (
                <li
                  key={`${copy}-${tech}`}
                  // The second copy only exists to make the loop seamless.
                  aria-hidden={copy === 1 ? "true" : undefined}
                  className="whitespace-nowrap rounded-full bg-fg/5 px-5 py-2 text-sm text-muted ring-1 ring-line/10"
                >
                  {tech}
                </li>
              )),
            )}
          </ul>
        </div>
      </section>

      {/* About */}
      <section className="mx-auto max-w-4xl px-6 py-28 text-center sm:py-40">
        <h2 className="text-3xl font-semibold leading-[1.15] tracking-tight sm:text-5xl lg:text-6xl">
          <ScrollText text={ABOUT} />
        </h2>
      </section>

      {/* Highlights */}
      <section aria-label="Highlights" className="mx-auto max-w-5xl px-6 pb-28 sm:pb-40">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {highlights.map((item, i) => (
            <Reveal key={item.label} delay={i * 80} className="h-full">
              <div className="h-full rounded-3xl bg-card p-6 text-center">
                <div className="bg-gradient-to-b from-fg to-muted bg-clip-text text-4xl font-semibold tracking-tight text-transparent sm:text-5xl">
                  {item.value}
                </div>
                <div className="mt-3 text-sm font-medium">{item.label}</div>
                <div className="mt-1 text-xs text-muted">{item.detail}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Career */}
      <section className="bg-alt py-28 sm:py-40">
        <div className="mx-auto max-w-3xl px-6">
          <Reveal>
            <h2 className="text-center text-4xl font-semibold tracking-tight sm:text-6xl">
              Career.
            </h2>
          </Reveal>
          <ol className="mt-16 space-y-4">
            {jobs.map((job) => (
              <li key={job.org + job.period}>
                <Reveal>
                  <div className="rounded-3xl bg-card-alt p-6 sm:p-8">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                      <h3 className="text-xl font-semibold tracking-tight">
                        {job.shortRole}
                        <span className="font-normal text-muted"> · {job.shortOrg}</span>
                      </h3>
                      <span className={`text-sm ${job.current ? "text-ok" : "text-muted"}`}>
                        {job.period}
                      </span>
                    </div>
                    <p className="mt-3 leading-relaxed text-muted">{job.summary}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
          <div className="mt-10 text-center">
            <Link
              href="/experience"
              className="inline-flex items-center gap-1 text-accent hover:underline"
            >
              Full experience, education & skills
              <ChevronRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* Selected work */}
      <section className="mx-auto max-w-5xl px-6 py-28 sm:py-40">
        <Reveal>
          <h2 className="text-center text-4xl font-semibold tracking-tight sm:text-6xl">
            Selected work.
          </h2>
        </Reveal>
        <div className="mt-16 grid gap-5 sm:grid-cols-2">
          {featured.map((project, i) => (
            <Reveal key={project.slug} delay={(i % 2) * 100}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            href="/projects"
            className="inline-flex items-center gap-1 text-accent hover:underline"
          >
            See all projects
            <ChevronRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* Closing call to action */}
      <section className="bg-alt px-6 py-28 text-center sm:py-36">
        <Reveal>
          <h2 className="text-4xl font-semibold tracking-tight sm:text-6xl">
            Let’s build something.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-xl text-muted">
            Open to conversations about AI, data, and computer vision.
          </p>
          <Link
            href="/contact"
            className="mt-10 inline-block rounded-full bg-brand px-6 py-3 text-base font-medium text-white transition-colors hover:bg-brand/85"
          >
            Get in touch
          </Link>
        </Reveal>
      </section>
    </>
  );
}
