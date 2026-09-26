/**
 * "How I work" principles for the About page. Each one is grounded in a
 * decision already made in the AI Job Alert System case study.
 */

/**
 * @typedef {Object} principle
 * @property {string} title - Short statement.
 * @property {string} detail - One or two sentences explaining it.
 */

/** @type {principle[]} */
export const principles = [
  {
    title: "The system drafts. A person decides.",
    detail:
      "Automation prepares the work — finding, sorting, drafting — and a human reviews and sends. Nothing that speaks for someone goes out on its own.",
  },
  {
    title: "Change the config, not the workflow.",
    detail:
      "Things that vary, like categories, keywords, and sources, live in a table. Adding a new case should mean adding a row, not rebuilding a pipeline.",
  },
  {
    title: "Build the shared path once.",
    detail:
      "Fetching, deduplication, drafting, and delivery run through one pipeline for every input, so a fix or improvement lands everywhere at the same time.",
  },
  {
    title: "Report real numbers or none.",
    detail: "Results get published once they've been measured. Until then, the case study says so.",
  },
];
