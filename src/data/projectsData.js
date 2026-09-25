/**
 * Project case studies. Each entry gets a card on the homepage and a
 * case-study page at /work/:project_id.
 */

/**
 * @typedef {Object} project
 * @property {string} id - URL slug; must be unique.
 * @property {string} title - Project name.
 * @property {string} summary - One or two sentences for the card and page lead.
 * @property {string[]} stack - Tools and services used.
 * @property {string} problem - What was wrong or missing before.
 * @property {string} approach - How the system was designed to solve it.
 * @property {string[]} architecture_notes - Key design decisions.
 * @property {string} result - Measured outcome. Keep REPLACE_ME until real numbers exist.
 * @property {string} [github_url] - Optional public repository.
 * @property {string} [demo_url] - Optional live demo URL.
 * @property {boolean} [demo_embed] - Embed demo_url in an iframe instead of only linking to it.
 */

/** @type {project[]} */
export const projects = [
  {
    id: "ai-job-alert-system",
    title: "AI Job Alert System",
    summary:
      "A config-driven n8n pipeline that finds relevant roles across multiple job categories and drafts tailored, AI-assisted applications — built as a real personal tool and as a working demonstration of how I design automation systems.",
    stack: ["n8n", "Airtable", "Claude/OpenAI API", "Telegram", "Webhooks"],
    problem:
      "Applying to roles across several unrelated categories (WordPress dev, general web dev, automation, content/SEO writing) meant retyping variations of the same pitch for every listing, across sources with no single feed.",
    approach:
      "Instead of hardcoding a search per job type, the system reads a config table — category, keywords, sources, and an AI persona per category — so adding a new job type is a new row, not a new workflow. A shared pipeline handles fetching, deduping, AI-drafting, and delivery for every category the same way.",
    architecture_notes: [
      "Config-driven: category rows in Airtable/Sheets drive what gets searched and how",
      "Dedup log prevents repeat alerts for the same listing",
      "AI persona per category — a WordPress pitch and an automation pitch are written differently",
      "Human-in-the-loop by design: it drafts, a person reviews and sends — never auto-submits",
    ],
    result: "REPLACE_ME — add the real outcome once there are numbers to report.",
    github_url: "",
    // Set demo_url to the deployed demo (e.g. an n8n form/webhook page) and keep
    // demo_embed true to show it inline on the case-study page.
    demo_url: "",
    demo_embed: true,
  },
];

/**
 * Look up a project by its URL slug.
 *
 * @param {string | undefined} project_id - Slug from the route.
 * @returns {project | undefined} Matching project, if any.
 */
export function get_project_by_id(project_id) {
  return projects.find((candidate) => candidate.id === project_id);
}
