/**
 * About page FAQ. Rendered visibly and as FAQPage JSON-LD, so answer engines
 * can quote it directly. Keep answers factual and two to three sentences.
 */

import { profile } from "./profileData";

/**
 * @typedef {Object} faq_entry
 * @property {string} question - Question as a person would ask it.
 * @property {string} answer - Direct, factual answer.
 */

/** @type {faq_entry[]} */
export const faq_entries = [
  {
    question: `What does ${profile.name} do?`,
    answer: `${profile.name} is a marketing specialist, automation engineer, and web developer based in ${profile.location}. His work spans SEO content strategy, web development, and building automation systems with tools like n8n. He currently writes football betting content for Goal.`,
  },
  {
    question: `Does ${profile.name} build WordPress sites?`,
    answer: `Yes. He works with WordPress, including Elementor and WooCommerce, and assisted on the Emporium De Vogue e-commerce store. He also works with HubSpot and OpenCart, and builds front-end sites with Vite and React.`,
  },
  {
    question: `Does ${profile.name} build automation systems with n8n?`,
    answer: `Yes. His AI Job Alert System is a config-driven n8n pipeline that finds relevant job listings and drafts tailored applications for a person to review before sending. He also works with Make and with AI APIs from OpenAI, Anthropic (Claude), and Hugging Face.`,
  },
  {
    question: `What content and SEO work does ${profile.name} do?`,
    answer: `He writes SEO content for sports betting and iGaming brands, including casino reviews, slot analyses, and football betting articles, for companies such as Goal and Revpanda. He also writes sales and advertising copy, email campaigns, and case studies, and his SEO work covers keyword research, content audits, competitor analysis, A/B testing, and KPI reporting.`,
  },
  {
    question: `Is ${profile.name} available for hire or contract work?`,
    answer: `Yes. He is open to direct hire and to contract work building automation systems. You can reach him through the contact form on this site or at ${profile.email}.`,
  },
];
