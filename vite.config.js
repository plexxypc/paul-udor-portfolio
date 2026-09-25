import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { profile } from "./src/data/profileData.js";

/**
 * Escape a string for safe insertion into HTML text and attribute positions.
 *
 * @param {string} value - Raw text.
 * @returns {string} HTML-escaped text.
 */
function escape_html(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * Fill `{{profile_*}}` tokens in index.html from profileData.js, so the static
 * <title> and meta description stay in sync with the single identity source.
 *
 * @returns {import("vite").Plugin} Vite plugin.
 */
function profile_html_plugin() {
  /** @type {Record<string, string>} */
  const replacements = {
    "{{profile_name}}": profile.name,
    "{{profile_title}}": profile.title,
    "{{profile_description}}": profile.bio,
    "{{profile_email}}": profile.email,
  };

  return {
    name: "profile-html",
    transformIndexHtml(html) {
      return Object.entries(replacements).reduce(
        (output, [token, value]) => output.replaceAll(token, escape_html(value)),
        html,
      );
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
  plugins: [react(), profile_html_plugin(), resume_file_check_plugin()],
  build: {
    // three.js (~610 kB) is its own lazy chunk, loaded only behind the hero.
    chunkSizeWarningLimit: 650,
  },
});
