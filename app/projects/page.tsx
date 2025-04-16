import Link from "next/link";
import React, { Suspense } from "react";
import { allProjects } from "contentlayer/generated";
import { Navigation } from "../components/nav";
import { Card } from "../components/card";
import { Article } from "./article";
import { Redis } from "@upstash/redis";
import { Eye } from "lucide-react";

// Redis client initialization
const redis = Redis.fromEnv();

// Project categories configuration
const PROJECTS_CONFIG = {
  featured: "Driver-Monitoring",
  secondary: ["Healthylicious", "IT-Jobs"],
  revalidationTime: 60 // seconds
};

// Type definitions for better type safety
type Project = (typeof allProjects)[0];
type ViewsMap = Record<string, number>;

// Helper functions
const formatDate = (dateString?: string) => {
  if (!dateString) return null;
  const date = new Date(dateString);
  return {
    formatted: Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(date),
    iso: date.toISOString()
  };
};

const formatViewCount = (count: number) => {
  return Intl.NumberFormat("en-US", { notation: "compact" }).format(count);
};

// Fetch view counts for projects
async function getProjectViews(): Promise<ViewsMap> {
  try {
    const viewKeys = allProjects.map((p) => ["pageviews", "projects", p.slug].join(":"));
    const viewCounts = await redis.mget<number[]>(...viewKeys);
    
    return allProjects.reduce<ViewsMap>((acc, project, index) => {
      acc[project.slug] = viewCounts[index] ?? 0;
      return acc;
    }, {});
  } catch (error) {
    console.error("Failed to fetch project views:", error);
    return allProjects.reduce<ViewsMap>((acc, project) => {
      acc[project.slug] = 0;
      return acc;
    }, {});
  }
}

// Project grid component to reduce redundancy
function ProjectGrid({ projects, views }: { projects: Project[], views: ViewsMap }) {
  return (
    <div className="grid grid-cols-1 gap-4">
      {projects.map((project) => (
        <Card key={project.slug}>
          <Article project={project} views={views[project.slug] ?? 0} />
        </Card>
      ))}
    </div>
  );
}

// Featured project component
function FeaturedProject({ project, views }: { project: Project, views: number }) {
  const dateInfo = formatDate(project.date);
  
  return (
    <Card>
      <Link href={`/projects/${project.slug}`} className="group">
        <article className="relative w-full h-full p-4 md:p-8">
          <div className="flex items-center justify-between gap-2">
            <div className="text-xs text-zinc-100">
              {dateInfo ? (
                <time dateTime={dateInfo.iso}>{dateInfo.formatted}</time>
              ) : (
                <span>COMING SOON</span>
              )}
            </div>
            <span className="flex items-center gap-1 text-xs text-zinc-500" title={`${views} views`}>
              <Eye className="w-4 h-4" aria-hidden="true" />
              <span>{formatViewCount(views)}</span>
            </span>
          </div>

          <h3 className="mt-4 text-3xl font-bold text-zinc-100 group-hover:text-white sm:text-4xl font-display">
            {project.title}
          </h3>
          <p className="mt-4 leading-8 duration-150 text-zinc-400 group-hover:text-zinc-300">
            {project.description}
          </p>
          <div className="absolute bottom-4 md:bottom-8">
            <p className="hidden text-zinc-200 group-hover:text-zinc-50 lg:block">
              Read more <span aria-hidden="true">&rarr;</span>
            </p>
          </div>
        </article>
      </Link>
    </Card>
  );
}

// Divider component
function Divider({ className = "" }: { className?: string }) {
  return <div className={`w-full h-px bg-zinc-800 ${className}`} aria-hidden="true" />;
}

export const revalidate = PROJECTS_CONFIG.revalidationTime;

export default async function ProjectsPage() {
  // Get view data for all projects
  const views = await getProjectViews();
  
  // Find and categorize projects
  const featuredProject = allProjects.find(p => p.slug === PROJECTS_CONFIG.featured);
  const secondaryProjects = PROJECTS_CONFIG.secondary
    .map(slug => allProjects.find(p => p.slug === slug))
    .filter(Boolean) as Project[];
  
  // Get remaining published projects, filtered and sorted by date
  const excludedSlugs = [PROJECTS_CONFIG.featured, ...PROJECTS_CONFIG.secondary];
  const otherProjects = allProjects
    .filter(p => p.published && !excludedSlugs.includes(p.slug))
    .sort((a, b) => {
      const dateA = a.date ? new Date(a.date).getTime() : Number.POSITIVE_INFINITY;
      const dateB = b.date ? new Date(b.date).getTime() : Number.POSITIVE_INFINITY;
      return dateB - dateA;
    });

  // Split remaining projects into 3 columns
  const projectColumns = Array.from({ length: 3 }, (_, columnIndex) => 
    otherProjects.filter((_, i) => i % 3 === columnIndex)
  );

  return (
    <div className="relative pb-16">
      <Navigation />
      <main className="px-6 pt-20 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-16 md:pt-24 lg:pt-32">
        <header className="max-w-2xl mx-auto lg:mx-0">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
            Projects
          </h1>
          <p className="mt-4 text-zinc-400">
            Some of the projects are from work and some are on my own time.
          </p>
        </header>
        
        <Divider />

        {/* Featured Projects Section */}
        <section aria-labelledby="featured-projects" className="animate-fadeIn">
          <h2 id="featured-projects" className="sr-only">Featured Projects</h2>
          <div className="grid grid-cols-1 gap-8 mx-auto lg:grid-cols-2">
            {/* Main Featured Project */}
            {featuredProject && (
              <FeaturedProject project={featuredProject} views={views[featuredProject.slug] ?? 0} />
            )}

            {/* Secondary Featured Projects */}
            <div className="flex flex-col w-full gap-8 mx-auto border-t border-gray-900/10 lg:mx-0 lg:border-t-0">
              {secondaryProjects.map(project => (
                <Card key={project.slug}>
                  <Article project={project} views={views[project.slug] ?? 0} />
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        <Divider className="hidden md:block" />

        {/* All Other Projects Section */}
        <section aria-labelledby="all-projects">
          <h2 id="all-projects" className="sr-only">All Projects</h2>
          <div className="grid grid-cols-1 gap-4 mx-auto lg:mx-0 md:grid-cols-3">
            {projectColumns.map((columnProjects, index) => (
              <Suspense key={`column-${index}`} fallback={<div className="h-32 rounded animate-pulse bg-zinc-800/20" />}>
                <ProjectGrid projects={columnProjects} views={views} />
              </Suspense>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}