export interface SkillGroup {
  id: string
  title: string
  skills: string[]
}

export const skillGroups: SkillGroup[] = [
  {
    id: 'core-web',
    title: 'Core Web',
    skills: [
      'HTML5',
      'CSS3',
      'JavaScript',
      'jQuery',
      'AJAX',
      'JSON',
      'Front-End Architecture',
    ],
  },
  {
    id: 'cms',
    title: 'CMS & Platforms',
    skills: ['WordPress', 'Elementor', 'HubSpot', 'OpenCart'],
  },
  {
    id: 'ui',
    title: 'UI & Site Structure',
    skills: [
      'Responsive Design',
      'Mockup-to-Build Conversion',
      'Custom Landing Pages',
      'Mobile Optimization',
      'Navigation Architecture',
      'Cross-Browser Compatibility',
    ],
  },
  {
    id: 'debugging',
    title: 'Debugging & Technical Operations',
    skills: [
      'Code Validation',
      'Third-Party Integration Debugging',
      'Website Security Cleanup',
      'Hosting Migration',
      'DNS',
      'SSL',
      'WordPress Recovery',
    ],
  },
  {
    id: 'seo-analytics',
    title: 'SEO & Analytics',
    skills: [
      'Google Analytics 4',
      'Google Search Console',
      'GTmetrix',
      'PageSpeed Insights',
      'Ahrefs',
      'SEMrush',
      'Ubersuggest',
      'Yoast SEO',
    ],
  },
  {
    id: 'ai',
    title: 'AI-Assisted Workflow',
    skills: ['ChatGPT/OpenAI', 'Claude', 'Make', 'n8n', 'Notion'],
  },
]
