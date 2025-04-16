import fs from "fs";
import path from "path";
import matter from "gray-matter";

const projectsDirectory = path.join(process.cwd(), "projects");

export function getAllProjects() {
  const fileNames = fs.readdirSync(projectsDirectory);

  const projects = fileNames.map((fileName) => {
    const filePath = path.join(projectsDirectory, fileName);
    const fileContents = fs.readFileSync(filePath, "utf8");

    const { data } = matter(fileContents);
    return {
      ...data,
      slug: fileName.replace(/\.mdx$/, ""),
    };
  });

  return projects;
}
