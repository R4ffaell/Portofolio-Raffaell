import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Mdx } from "../../components/mdx";
import { getProject, getPublishedProjects } from "../../lib/projects";
import { getViewCount } from "../../lib/views";
import { Header } from "./header";
import "./mdx.css";
import { ReportView } from "./view";

export const revalidate = 60;
// Only published slugs exist; anything else is a 404 (drafts never render).
export const dynamicParams = false;

type Props = {
  params: { slug: string };
};

export function generateStaticParams(): Props["params"][] {
  return getPublishedProjects().map((project) => ({ slug: project.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const project = getProject(params.slug);
  if (!project) return {};
  return { title: project.title, description: project.description };
}

export default async function ProjectPage({ params }: Props) {
  const project = getProject(params.slug);
  if (!project) notFound();

  const views = await getViewCount(project.slug);

  return (
    <>
      <Header project={project} views={views} />
      <ReportView slug={project.slug} />
      <div className="mx-auto max-w-3xl px-6 py-14 sm:py-20">
        <article className="prose prose-quoteless max-w-none">
          <Mdx code={project.body.code} />
        </article>
      </div>
    </>
  );
}
