/**
 * Single source of truth for identity. Every component that shows a name,
 * title, bio, email, or social link reads from here, and vite.config.js uses it
 * to fill the static <title> and meta description in index.html.
 *
 * Anything marked REPLACE_ME still needs real information.
 */

/**
 * @typedef {Object} social_link
 * @property {string} label - Human-readable network name.
 * @property {string} handle - Username shown next to the label.
 * @property {string} url - Absolute profile URL.
 */

/**
 * @typedef {Object} profile_data
 * @property {string} name - Full name.
 * @property {string} title - Professional title shown under the hero heading.
 * @property {string} tagline - Optional one-line hero statement. Empty string hides it.
 * @property {string} bio - Short bio used in the hero and meta description.
 * @property {string} email - Contact address; also the FormSubmit destination.
 * @property {string} location - Optional location. Empty string hides it.
 * @property {string[]} focus_areas - Disciplines listed in the hero spec panel.
 * @property {string[]} tools - Primary tools listed in the hero spec panel.
 * @property {string[]} open_to - Kinds of engagement listed in the hero spec panel.
 * @property {string} resume_url - Public path to the resume PDF. Empty string hides the Resume section and nav item.
 * @property {string} resume_file_name - File name suggested when the PDF is downloaded.
 * @property {social_link[]} socials - Social profiles, in display order.
 */

/** @type {profile_data} */
export const profile = {
  name: "Paul Udor",
  title: "Marketing Specialist, Automation Engineer & Web Developer",
  // REPLACE_ME (optional): a first-person one-liner for the hero. While empty,
  // the hero heading falls back to your name.
  tagline: "",
  bio: "Paul Udor is a multidisciplinary digital professional, strategist, and builder with experience spanning digital marketing, SEO, content, web development, and emerging technology.",
  email: "paul.udor@gmail.com",
  location: "",
  focus_areas: ["digital marketing", "SEO", "content", "web development", "automation"],
  tools: ["n8n", "WordPress"],
  open_to: ["direct hire", "automation builds"],
  // The PDF lives at public/resume/paul-udor-resume.pdf; `npm run build` warns if it's missing.
  resume_url: "/resume/paul-udor-resume.pdf",
  resume_file_name: "Paul-Udor-Resume.pdf",
  socials: [
    { label: "GitHub", handle: "plexxypc", url: "https://github.com/plexxypc" },
    { label: "LinkedIn", handle: "paul-udor", url: "https://www.linkedin.com/in/paul-udor/" },
    { label: "Facebook", handle: "paul.udor", url: "https://www.facebook.com/paul.udor/" },
  ],
};
