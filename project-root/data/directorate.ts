// data/directorate.ts
export type DirectorateMember = {
  id: string
  name: string
  role: string
  credentials?: string
  photo: string    // file in assets/images/employees/*
  email?: string
  linkedin?: string
  facebook?: string
}

export const DIRECTORATE: DirectorateMember[] = [
  {
    id: 'gevorg-karyan',
    name: 'Gevorg Karyan',
    role: 'Director',
    photo: 'gevorg-karyan.webp'
  },
  {
    id: 'levon-avetisyan',
    name: 'Levon Avetisyan',
    role: 'Head of Production and Economic Department',
    photo: 'levon-avetisyan.webp'
  },
  {
    id: 'vardan-avagyan',
    name: 'Vardan Avagyan',
    role: 'Economic Advisor',
    photo: 'vardan-avagyan.webp'
  },
  {
    id: 'arthur-hakobyan',
    name: 'Arthur Hakobyan',
    role: 'Director',
    photo: 'arthur-hakobyan.webp'
  },
  {
    id: 'karen-fidanyan',
    name: 'Karen Fidanyan',
    role: 'Head of Finance Department',
    photo: 'karen-fidanyan.webp'
  },
  {
    id: 'eric-khastyan',
    name: 'Eric Khastyan',
    role: 'Scientific Secretary (P/P)',
    photo: 'eric-khastyan.webp'
  }
]
