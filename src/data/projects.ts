export interface Project {
  id: string
  title: string
  url: string
  image: string
  category?: string
  description: string
}

export const projects: Project[] = [
  {
    id: 'emporium-de-vogue',
    title: 'Emporium De Vogue',
    url: 'https://emporiumdevogue.com/',
    image: 'assets/edv.png',
    category: 'Fashion · E-commerce',
    description:
      'An e-commerce store for made-to-order female garments that celebrate African culture, class, and individuality, using textiles like Akwete, Aso-Oke, and Adire.',
  },
  {
    id: 'caldera-stores',
    title: 'Caldera Stores',
    url: 'https://calderastores.com/',
    image: '/src/assets/caldera.png',
    category: 'Phone Repair · Accessories',
    description:
      'A phone repair and accessory shop located across different cities in the South-Western and Northern parts of Nigeria.',
  },
  {
    id: 'intelfort',
    title: 'Intelfort',
    url: 'https://intelfortng.com/',
    image: '/src/assets/intelfort.png',
    category: 'Data Analytics',
    description:
      'A Lagos-based data analytics company handling big data for various institutions in Nigeria and overseas.',
  },
  {
    id: 'ss-digital-solutions',
    title: 'SS Digital Solutions',
    url: 'https://ssdigitalsolutions.com/',
    image: '/src/assets/ssdigital.png',
    category: 'Digital Development Agency',
    description:
      'A digital development agency focusing on web development, automation, and marketing.',
  },
  {
    id: 'dsa-lagos',
    title: 'DSA Lagos',
    url: 'https://dsalagos.com/',
    image: '/projects/dsa-lagos.webp',
    category: 'Fashion',
    description:
      'A fashion brand providing evening dresses, bridal dresses, and elegant styles for premium clients.',
  },
]
