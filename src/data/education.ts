export interface EducationItem {
  id: string
  institution: string
  credential: string
  period: string
}

export const education: EducationItem[] = [
  {
    id: 'unilorin',
    institution: 'University of Ilorin',
    credential: 'B.Sc. Telecommunication Engineering',
    period: '2013 – 2018',
  },
  {
    id: 'freecodecamp',
    institution: 'freeCodeCamp',
    credential: 'Front-End Development Certification',
    period: '2018',
  },
  {
    id: 'w3schools',
    institution: 'W3Schools',
    credential: 'Front-End Development — HTML, CSS, JS, PHP',
    period: '2018',
  },
]
