export interface Service {
  id: string
  title: string
  description: string
}

export const services: Service[] = [
  {
    id: 'front-end',
    title: 'Front-End Development',
    description:
      'Responsive websites and landing pages using HTML, CSS, JavaScript and jQuery.',
  },
  {
    id: 'wordpress',
    title: 'WordPress Development',
    description:
      'WordPress implementation, Elementor builds, customization, troubleshooting, and content-management setups.',
  },
  {
    id: 'recovery',
    title: 'Website Recovery & Migration',
    description:
      'WordPress recovery, security cleanup, hosting migration, DNS, SSL, backups, and configuration.',
  },
  {
    id: 'performance',
    title: 'Website Performance',
    description:
      'Mobile optimization, image optimization, caching investigation, plugin troubleshooting, and performance diagnostics.',
  },
  {
    id: 'seo',
    title: 'Technical SEO',
    description:
      'Semantic HTML, site structure, metadata, internal linking, image SEO, keyword implementation, and technical optimization.',
  },
  {
    id: 'analytics',
    title: 'Analytics & Tracking',
    description:
      'Google Analytics, Google Search Console, tracking setup, reporting, and measurement.',
  },
]
