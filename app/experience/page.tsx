import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Reveal } from "../components/reveal";
import {
  certifications,
  education,
  jobs,
  languages,
  organization,
  skills,
  summary,
} from "../lib/profile";
import { site } from "../lib/site";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Work experience, education, certifications and skills of Anakta Raffaell Tambunan.",
};

function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section aria-labelledby={id} className="mt-20 sm:mt-28">
      <Reveal>
        <h2 id={id} className="text-3xl font-semibold tracking-tight sm:text-4xl">
          {title}
        </h2>
      </Reveal>
      <div className="mt-8">{children}</div>
    </section>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="mt-5 ml-5 list-disc space-y-2 text-sm leading-6 text-muted marker:text-muted/60">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export default function ExperiencePage() {
  return (
    <div className="mx-auto max-w-4xl px-6 pb-28 pt-20 sm:pt-28">
      <header>
        <h1 className="animate-fade-up text-5xl font-semibold tracking-tighter sm:text-7xl">
          Experience.
        </h1>
        <p
          className="animate-fade-up mt-6 max-w-2xl text-xl leading-relaxed text-muted"
          style={{ animationDelay: "120ms" }}
        >
          {summary}
        </p>
        <a
          href={site.resume}
          target="_blank"
          rel="noopener noreferrer"
          className="animate-fade-up mt-8 inline-block rounded-full bg-brand px-6 py-3 text-base font-medium text-white transition-colors hover:bg-brand/85"
          style={{ animationDelay: "240ms" }}
        >
          View resume
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      </header>

      <Section id="work" title="Work">
        <div className="space-y-4">
          {jobs.map((job) => (
            <Reveal key={job.org + job.period}>
              <article className="rounded-3xl bg-card p-6 sm:p-8">
                <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-baseline">
                  <h3 className="text-xl font-semibold tracking-tight">
                    {job.org}
                    <span className="font-normal text-muted"> · {job.place}</span>
                  </h3>
                  <span className={`text-sm ${job.current ? "text-ok" : "text-muted"}`}>
                    {job.period}
                  </span>
                </div>
                <p className="mt-1 text-sm font-medium">{job.role}</p>
                <Bullets items={job.points} />
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section id="education" title="Education">
        <Reveal>
          <article className="rounded-3xl bg-card p-6 sm:p-8">
            <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-baseline">
              <h3 className="text-xl font-semibold tracking-tight">
                {education.school}
                <span className="font-normal text-muted"> · {education.place}</span>
              </h3>
              <span className="text-sm text-muted">{education.period}</span>
            </div>
            <p className="mt-1 text-sm font-medium">
              {education.degree} · GPA {education.gpa}
            </p>
          </article>
        </Reveal>
      </Section>

      <Section id="leadership" title="Leadership">
        <Reveal>
          <article className="rounded-3xl bg-card p-6 sm:p-8">
            <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-baseline">
              <h3 className="text-xl font-semibold tracking-tight">{organization.name}</h3>
              <span className="text-sm text-muted">{organization.period}</span>
            </div>
            <p className="mt-1 text-sm font-medium">{organization.role}</p>
            <Bullets items={organization.points} />
          </article>
        </Reveal>
      </Section>

      <Section id="certifications" title="Certifications">
        <ul className="grid gap-3 sm:grid-cols-2">
          {certifications.map((cert, i) => (
            <li key={cert}>
              <Reveal delay={(i % 2) * 80} className="h-full">
                <div className="h-full rounded-2xl bg-card px-5 py-4 text-sm leading-6">
                  {cert}
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="skills" title="Skills">
        <Reveal>
          <p className="text-sm text-muted">Languages: {languages}</p>
        </Reveal>
        <div className="mt-8 space-y-8">
          {Object.entries(skills).map(([group, items]) => (
            <Reveal key={group}>
              <h3 className="mb-3 text-sm font-semibold">{group}</h3>
              <ul className="flex flex-wrap gap-2">
                {items.map((skill) => (
                  <li
                    key={skill}
                    className="rounded-full bg-fg/5 px-3.5 py-1.5 text-xs text-muted ring-1 ring-line/10"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </Section>
    </div>
  );
}
