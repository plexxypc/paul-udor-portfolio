export interface ExperienceItem {
  id: string
  company: string
  role: string
  location: string
  period: string
  description: string[]
  additional?: boolean
}

export const experience: ExperienceItem[] = [
  {
    id: 'ss-digital',
    company: 'SS Digital Solutions',
    role: 'Freelance Web Developer',
    location: 'Remote, Ikeja, Lagos',
    period: 'March 2018 – December 2020',
    description: [
      'Designed and built websites for multiple clients using HTML5, CSS3, JavaScript, and jQuery.',
      'Converted mockups into responsive, cross-browser-compatible websites.',
      'Implemented front-end builds on WordPress and HubSpot.',
      'Built SEO into development through semantic HTML and site structure.',
      'Debugged third-party integrations.',
      'Built custom landing pages and site features.',
      'Worked directly with clients to scope, build, and troubleshoot projects.',
      'Worked with OpenCart for line-code repairs and optimization.',
    ],
  },
  {
    id: 'unizone',
    company: 'Unizone Group',
    role: 'Web Developer',
    location: 'Remote, Ilorin, Kwara',
    period: 'November 2014 – March 2019',
    description: [
      'Developed functional client-facing web assets.',
      'Applied front-end programming skills in an early-career role.',
      'Worked across teams to translate project requirements into working web features.',
      'Built a foundation in front-end development that carried into later freelance and technical work.',
    ],
  },
]

export const additionalExperience: ExperienceItem[] = [
  {
    id: 'goal',
    company: 'Goal',
    role: 'Football Betting Writer',
    location: 'Remote, United States',
    period: 'Feb 2025 – Present',
    description: [
      'Run content audits using Google Analytics and SEMrush.',
      'Update 25+ pages monthly to improve search relevance.',
    ],
    additional: true,
  },
  {
    id: 'revpanda',
    company: 'Revpanda',
    role: 'SEO iGaming Content Strategist',
    location: 'Remote, Estonia',
    period: 'Dec 2022 – July 2026',
    description: [
      'Delivered 50+ SEO articles/month.',
      'Used Ahrefs and SEMrush for keyword research.',
      'Work contributed to a reported 12% average monthly increase in organic traffic.',
    ],
    additional: true,
  },
  {
    id: 'knup',
    company: 'Knup Solution LLC',
    role: 'Sport and Gambling Writer',
    location: 'Remote, Florida, US',
    period: 'Jan 2022 – March 2025',
    description: [
      'Formatted and published content using WordPress and other CMS platforms.',
      'Applied HTML/CSS fundamentals during publishing and content management.',
    ],
    additional: true,
  },
  {
    id: 'intelfort',
    company: 'Intelfort Nigeria LTD',
    role: 'Content and Digital Manager',
    location: 'Lagos, Nigeria',
    period: 'Dec 2020 – Dec 2021',
    description: [
      'Led digital campaign analysis using Google Analytics and Tableau.',
      'Used A/B testing to support marketing performance improvements.',
      'Managed a team of 4.',
      'Used SEMrush and Ahrefs competitor analysis to improve page rankings.',
    ],
    additional: true,
  },
  {
    id: 'topcontent',
    company: 'Topcontent',
    role: 'Freelance Writer',
    location: 'Remote, Malta',
    period: 'Aug 2018 – June 2021',
    description: [
      'Produced marketing content and case studies for international clients.',
    ],
    additional: true,
  },
]
