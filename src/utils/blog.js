/**
 * Blog loader. Every markdown file in src/content/blog is bundled at build time
 * via import.meta.glob, parsed by utils/frontmatter.js, and exposed newest-first.
 */

import { compare_posts_newest_first, to_blog_post } from "./frontmatter";

/** @typedef {import("./frontmatter").blog_post} blog_post */

/** @type {Record<string, string>} */
const markdown_modules = import.meta.glob("/src/content/blog/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
});

/** @type {blog_post[]} */
export const all_posts = Object.entries(markdown_modules)
  .map(([file_path, raw_text]) => to_blog_post(file_path, raw_text))
  .sort(compare_posts_newest_first);

/**
 * Newest posts first.
 *
 * @param {number} count - Maximum number of posts.
 * @returns {blog_post[]} Up to `count` posts.
 */
export function get_recent_posts(count) {
  return all_posts.slice(0, count);
}

/**
 * Look up a post by slug.
 *
 * @param {string | undefined} slug - Slug from the route.
 * @returns {blog_post | undefined} Matching post, if any.
 */
export function get_post_by_slug(slug) {
  return all_posts.find((post) => post.slug === slug);
}
