import { existsSync, readdirSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { profile, to_absolute_url } from "./src/data/profileData.js";
import { projects } from "./src/data/projectsData.js";
import { compare_posts_newest_first, to_blog_post } from "./src/utils/frontmatter.js";
import { build_person_schema, serialize_json_ld } from "./src/utils/structured_data.js";

const BLOG_DIRECTORY = fileURLToPath(new URL("./src/content/blog/", import.meta.url));

/** Static routes, in sitemap order. Dynamic project and post routes are appended. */
const STATIC_ROUTES = ["/", "/about", "/work", "/blog"];

/**
 * Escape a string for safe insertion into HTML/XML text and attribute positions.
 *
 * @param {string} value - Raw text.
 * @returns {string} Escaped text.
 */
function escape_html(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * Read and parse every blog post from disk, newest first.
 *
 * @returns {import("./src/utils/frontmatter.js").blog_post[]} Posts.
 */
function read_blog_posts() {
  return readdirSync(BLOG_DIRECTORY)
    .filter((file_name) => file_name.endsWith(".md"))
    .map((file_name) => to_blog_post(file_name, readFileSync(`${BLOG_DIRECTORY}${file_name}`, "utf8")))
    .sort(compare_posts_newest_first);
}

/**
 * @typedef {Object} sitemap_entry
 * @property {string} path - Site-relative path.
 * @property {string} [last_modified] - ISO date, when known.
 */

/**
 * Build sitemap.xml from the static routes, projectsData.js, and blog markdown.
 *
 * @returns {string} Sitemap XML.
 */
function build_sitemap_xml() {
  /** @type {sitemap_entry[]} */
  const entries = [
    ...STATIC_ROUTES.map((path) => ({ path })),
    ...projects.map((project) => ({ path: `/work/${project.id}` })),
    ...read_blog_posts().map((post) => ({ path: `/blog/${post.slug}`, last_modified: post.date || undefined })),
  ];

  const url_elements = entries
    .map((entry) => {
      const last_modified = entry.last_modified ? `\n    <lastmod>${escape_html(entry.last_modified)}</lastmod>` : "";
      return `  <url>\n    <loc>${escape_html(to_absolute_url(entry.path))}</loc>${last_modified}\n  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${url_elements}\n</urlset>\n`;
}

/**
 * Fill `{{profile_*}}` tokens in index.html from profileData.js, so the static
 * fallback <head> (seen by crawlers that don't run JavaScript) stays in sync
 * with the identity source. Also bakes in the site-wide Person JSON-LD.
 *
 * @returns {import("vite").Plugin} Vite plugin.
 */
function profile_html_plugin() {
  /** @type {Record<string, string>} */
  const replacements = {
    "{{profile_name}}": escape_html(profile.name),
    "{{profile_title}}": escape_html(profile.title),
    "{{profile_description}}": escape_html(profile.bio),
    "{{profile_email}}": escape_html(profile.email),
    "{{site_url}}": escape_html(to_absolute_url("/")),
    "{{person_json_ld}}": serialize_json_ld(build_person_schema()),
  };

  return {
    name: "profile-html",
    transformIndexHtml(html) {
      return Object.entries(replacements).reduce((output, [token, value]) => output.replaceAll(token, value), html);
    },
  };
}

/**
 * Emit sitemap.xml at build time, and serve the same output at /sitemap.xml
 * in dev so it can be checked locally.
 *
 * @returns {import("vite").Plugin} Vite plugin.
 */
function sitemap_plugin() {
  return {
    name: "sitemap",
    configureServer(server) {
      server.middlewares.use("/sitemap.xml", (_request, response) => {
        response.setHeader("Content-Type", "application/xml; charset=utf-8");
        response.end(build_sitemap_xml());
      });
    },
    generateBundle() {
      this.emitFile({ type: "asset", fileName: "sitemap.xml", source: build_sitemap_xml() });
    },
  };
}

/**
 * Warn when profile.resume_url points at a file that isn't in public/. On
 * Netlify/Vercel a missing file would fall through to the SPA rewrite and
 * "download" index.html instead of a PDF.
 *
 * @returns {import("vite").Plugin} Vite plugin.
 */
function resume_file_check_plugin() {
  return {
    name: "resume-file-check",
    buildStart() {
      if (!profile.resume_url) return;
      const resume_path = fileURLToPath(new URL(`./public${profile.resume_url}`, import.meta.url));
      if (!existsSync(resume_path)) {
        this.warn(`Resume PDF not found at public${profile.resume_url} — the Resume download link will be broken.`);
      }
    },
  };
}

export default defineConfig({
  plugins: [react(), profile_html_plugin(), sitemap_plugin(), resume_file_check_plugin()],
  build: {
    // three.js (~610 kB) is its own lazy chunk, loaded only behind the hero.
    chunkSizeWarningLimit: 650,
  },
});
