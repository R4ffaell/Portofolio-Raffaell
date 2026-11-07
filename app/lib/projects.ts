import { allProjects, type Project } from "contentlayer/generated";

/** Shown as the large hero card on /projects when it exists and is published. */
export const PINNED_SLUG = "Driver-Monitoring";

const time = (date?: string) => (date ? new Date(date).getTime() : 0);

/** Published projects, newest first. Unpublished drafts never leave this module. */
export function getPublishedProjects(): Project[] {
  return allProjects
    .filter((p) => p.published)
    .sort((a, b) => time(b.date) - time(a.date));
}

export function getProject(slug: string): Project | undefined {
  return getPublishedProjects().find((p) => p.slug === slug);
}

/** Featured projects, pinned one first, then newest. */
export function getFeaturedProjects(limit?: number): Project[] {
  const featured = getPublishedProjects().filter((p) => p.featured);
  featured.sort(
    (a, b) => Number(b.slug === PINNED_SLUG) - Number(a.slug === PINNED_SLUG),
  );
  return typeof limit === "number" ? featured.slice(0, limit) : featured;
}

// Fixed locale + UTC so server and client render identical text.
const dateFormat = new Intl.DateTimeFormat("en-US", {
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});
const compactFormat = new Intl.NumberFormat("en-US", { notation: "compact" });

export function formatDate(date?: string) {
  if (!date) return null;
  const d = new Date(date);
  return { label: dateFormat.format(d), iso: d.toISOString() };
}

export const compactNumber = (n: number) => compactFormat.format(n);

/** Two-letter placeholder shown behind (or instead of) a missing thumbnail. */
export function projectInitials(title: string) {
  return title
    .replace(/[^A-Za-z0-9 ]/g, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

const hostLabels: [RegExp, string][] = [
  [/(^|\.)roboflow\.com$/, "Roboflow dataset"],
  [/(^|\.)kaggle\.com$/, "Kaggle dataset"],
  [/(^|\.)vercel\.app$/, "Live site"],
];

/** Names a project's `url` by where it points, instead of calling everything "Website". */
function linkLabel(href: string) {
  try {
    const { hostname, pathname } = new URL(href);
    if (/^(www\.)?github\.com$/.test(hostname)) {
      // github.com/<owner> is a profile/org page; github.com/<owner>/<repo> is a repo.
      return pathname.split("/").filter(Boolean).length > 1 ? "GitHub" : "More on GitHub";
    }
    return hostLabels.find(([pattern]) => pattern.test(hostname))?.[1] ?? "Website";
  } catch {
    return "Website";
  }
}

export function getProjectLinks(project: Project) {
  const links: { label: string; href: string }[] = [];
  const repo = project.repository
    ? `https://github.com/${project.repository}`
    : undefined;
  if (repo) links.push({ label: "GitHub", href: repo });
  if (project.url && project.url.toLowerCase() !== repo?.toLowerCase()) {
    links.push({ label: linkLabel(project.url), href: project.url });
  }
  return links;
}
