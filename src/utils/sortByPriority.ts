import type { ProjectFrontmatter } from "@types";
import type { MarkdownInstance } from "astro";

const sortByPriority = (a: MarkdownInstance<ProjectFrontmatter>, b: MarkdownInstance<ProjectFrontmatter>) => {
  if (a.frontmatter.priority > b.frontmatter.priority) return -1;
  if (a.frontmatter.priority < b.frontmatter.priority) return 1;

  return 0;
};

export default sortByPriority;