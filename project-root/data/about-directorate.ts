// data/about-directorate.ts
export type DirectorateMember = {
  id: string
  name: string
  role: string
  photo: string
}

export const DIRECTORATE: DirectorateMember[] = [
  { id: 'gevorg-karyan', name: 'Gevorg Karyan', role: 'Director', photo: 'gevorg-karyan.webp' },
  // …
]

