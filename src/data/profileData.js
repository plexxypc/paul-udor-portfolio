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
 * @typedef {Object} skill_group
 * @property {string} category - Group heading.
 * @property {string[]} items - Skills and tools in the group.
 */

/**
 * @typedef {Object} profile_data
 * @property {string} site_url - Production origin, no trailing slash. Used for canonical URLs, Open Graph, sitemap, and schema.
 * @property {string} name - Full name.
 * @property {string} title - Professional title shown under the hero heading.
 * @property {string} tagline - Optional one-line hero statement. Empty string hides it.
 * @property {string} bio - Short bio used in the hero and meta description.
 * @property {string[]} story - Paragraphs for the About page's background section.
 * @property {skill_group[]} skills - Skills grouped by category; also feeds Person schema `knowsAbout`.
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
  // REPLACE_ME (confirm): taken from the GitHub profile. Must match the deployed domain.
  // public/robots.txt and public/llms.txt repeat it and need the same edit.
  site_url: "https://pauludor.com",
  name: "Paul Udor",
  title: "Marketing Specialist, Automation Engineer & Web Developer",
  // REPLACE_ME (optional): a first-person one-liner for the hero. While empty,
  // the hero heading falls back to your name.
  tagline: "",
  bio: "Paul Udor is an SEO content strategist and web developer based in Lagos, Nigeria. He writes search-led content for sports and iGaming brands, builds websites, and automates content workflows with n8n.",
  story: [
    "Paul started as a web developer. While studying Telecommunication Engineering at the University of Ilorin, he built websites for Unizone Group, then earned freeCodeCamp's front-end certification. From 2018 he freelanced for SS Digital Solution, building and maintaining client sites on WordPress, HubSpot, and OpenCart with SEO built into the page structure.",
    "Writing grew alongside the code. He wrote for Topcontent, co-founded the content agency Hustle Writers, and led content and digital at Intelfort Nigeria, managing a team of four across more than ten client accounts. Since 2022 he has specialised in SEO content for sports betting and iGaming, first with Knup Solution and Revpanda, and now as a football betting writer for Goal.",
    "His current work combines the two: search-led content grounded in keyword research and performance data, and automation systems, built with tools like n8n, that take the repetitive parts of a workflow off a person's plate while leaving the final decisions with them.",
  ],
  skills: [
    {
      category: "Content Strategy & Execution",
      items: [
        "Article Production",
        "Sales Copywriting",
        "Campaign Scripting",
        "SEO-Friendly Content Creation",
        "iGaming Content (Casino/Slot Reviews)",
        "Sports Content",
        "Technical Documentation Translation",
        "Advertising/Marketing Copy",
        "Case Studies",
        "Email Campaigns/Newsletters",
      ],
    },
    {
      category: "SEO & Analytics",
      items: [
        "In-depth Keyword Research",
        "Organic Ranking Optimization",
        "Content Audit",
        "A/B Testing Strategies",
        "Performance Reporting (KPIs)",
        "Competitor Analysis",
      ],
    },
    {
      category: "AI Tools",
      items: ["ChatGPT/OpenAI", "Jasper", "Notion", "Make", "n8n", "Hugging Face APIs", "Claude"],
    },
    {
      category: "Web Development (Front-End/CMS)",
      items: [
        "HTML5",
        "CSS3",
        "JavaScript",
        "jQuery",
        "AJAX",
        "JSON",
        "WordPress",
        "HubSpot",
        "OpenCart",
        "Front-End Architecture",
      ],
    },
  ],
  email: "paul.udor@gmail.com",
  location: "Lagos, Nigeria",
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

/**
 * Build an absolute URL on the production site.
 *
 * @param {string} path - Site-relative path beginning with "/".
 * @returns {string} Absolute URL.
 */
export function to_absolute_url(path) {
  return `${profile.site_url}${path}`;
}
