import type { APIRoute, MarkdownInstance } from "astro";
import generateOgImage from "@utils/generateOgImage";
import type { Frontmatter } from "@types";
import generatePngOgImage from "@utils/generatePngOgImage";

export const get: APIRoute = async ({ params }) => ({
  body: await generatePngOgImage(params.ogTitle),
});

const postImportResult = import.meta.glob<MarkdownInstance<Frontmatter>>(
  "../contents/**/**/*.md",
  {
    eager: true,
  }
);
const posts = Object.values(postImportResult);

export function getStaticPaths() {
  return posts
    .filter(({ frontmatter }) => !frontmatter.draft)
    .filter(({ frontmatter }) => !frontmatter.ogImage)
    .map(({ frontmatter }) => ({
      params: { ogTitle: frontmatter.title },
    }));
}
