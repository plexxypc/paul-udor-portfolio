/**
 * Work history for the About page timeline, newest first. Taken from the
 * resume in public/resume/; keep the two in sync.
 */

/**
 * @typedef {Object} experience_entry
 * @property {string} role - Job title.
 * @property {string} company - Employer or client.
 * @property {string} location - Where the role was based, e.g. "Remote, United States".
 * @property {string} start_date - "YYYY-MM".
 * @property {string} end_date - "YYYY-MM", or "present" for a current role.
 * @property {string} description - One or two sentences on scope and outcomes.
 */

/** @type {experience_entry[]} */
export const experience = [
  {
    role: "Football Betting Writer",
    company: "Goal",
    location: "Remote, United States",
    start_date: "2025-02",
    end_date: "present",
    description:
      "Writes and edits SEO-optimised football betting content for an international audience, aligned with brand, compliance, and conversion goals. Runs monthly content audits with Google Analytics and SEMrush, updating 25+ stale or incorrect pieces each month.",
  },
  {
    role: "SEO iGaming Content Strategist",
    company: "Revpanda",
    location: "Remote, Estonia",
    start_date: "2022-12",
    end_date: "2026-07",
    description:
      "Produced 50+ SEO articles a month, including casino reviews, slot analyses, and sportsbook and crypto-gambling content, optimised for rankings, click-through rate, and affiliate conversion. Keyword research in Ahrefs and SEMrush drove an average 12% monthly increase in organic traffic to assigned client sites.",
  },
  {
    role: "Sport and Gambling Writer",
    company: "Knup Solution LLC",
    location: "Remote, Florida, United States",
    start_date: "2022-01",
    end_date: "2025-03",
    description:
      "Wrote and edited sports content under tight deadlines and led brainstorming sessions that produced 3–5 new content formats a month. Restructured content for readability, contributing to a 10% increase in time spent on content.",
  },
  {
    role: "Content and Digital Manager",
    company: "Intelfort Nigeria Ltd",
    location: "Lagos, Nigeria",
    start_date: "2020-12",
    end_date: "2021-12",
    description:
      "Managed a team of four and ran web, social, and email content for 10+ client accounts. Campaign analysis in Google Analytics and Tableau, plus A/B testing, raised conversion rates by 18% and marketing ROI by 25%.",
  },
  {
    role: "DevOps Lead and Co-founder",
    company: "Hustle Writers",
    location: "Remote, Ibadan, Nigeria",
    start_date: "2019-03",
    end_date: "2020-12",
    description:
      "Co-founded a content agency and helped build its production system, managing quality control so SEO-focused content could be delivered at scale and at an accessible price.",
  },
  {
    role: "Freelance Writer",
    company: "Topcontent",
    location: "Remote, Malta",
    start_date: "2018-08",
    end_date: "2021-06",
    description:
      "Researched and wrote case studies, marketing emails, and newsletters, turning technical subject matter into clear copy. Repurposed existing content across formats, such as blog posts into email series.",
  },
  {
    role: "Freelance Web Developer",
    company: "SS Digital Solution",
    location: "Remote, Ikeja, Lagos",
    start_date: "2018-03",
    end_date: "2020-12",
    description:
      "Built and maintained client websites in HTML5, CSS3, JavaScript, and jQuery on WordPress and HubSpot, with semantic markup and SEO best practices built in. Handled OpenCart e-commerce fixes and trained clients to manage their own sites.",
  },
  {
    role: "Web Developer",
    company: "Unizone Group",
    location: "Remote, Ilorin, Kwara",
    start_date: "2014-11",
    end_date: "2019-03",
    description:
      "Built websites and web assets for clients alongside university studies, working within cross-functional teams on project planning and delivery.",
  },
];
