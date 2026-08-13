export interface Project {
  id: string
  title: string
  category: string
  description: string
  tags: string[]
  featured?: boolean
  caseStudy?: boolean
  placeholder?: boolean
  cta?: { label: string; href: string }
}

export const projects: Project[] = [
  {
    id: 'dsa-lagos',
    title: 'DSA Lagos',
    category: 'Website Recovery · WordPress · SEO · Performance',
    description:
      'Recovered and rebuilt a compromised WordPress website for a Lagos fashion brand, including migration, DNS and SSL configuration, security cleanup, Elementor reconstruction, mobile performance optimization, and technical/local SEO.',
    tags: [
      'WordPress',
      'Elementor',
      'Hostinger',
      'GTmetrix',
      'Ahrefs',
      'Google Search Console',
      'GA4',
      'Technical SEO',
    ],
    featured: true,
    caseStudy: true,
    cta: { label: 'View Case Study', href: '#case-study' },
  },
  {
    id: 'project-2',
    title: 'Client Website',
    category: 'Front-End Development · WordPress',
    description: 'Project coming soon — a responsive website build from mockup to production.',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'WordPress'],
    placeholder: true,
  },
  {
    id: 'project-3',
    title: 'Landing Page Build',
    category: 'Front-End · Performance',
    description: 'Project coming soon — a custom landing page with performance-focused implementation.',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'SEO'],
    placeholder: true,
  },
]
