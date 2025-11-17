// data/about-stats.ts
export type StatCard = {
  id: string
  label: string
  value: string
  description?: string
}

export const ABOUT_STATS: StatCard[] = [
  { id: 'no1', value: 'Nº1', label: 'Research institution in physics and nuclear sciences' },
  { id: 'divisions', value: '8', label: 'Scientific Divisions' },
  { id: 'collabs', value: '20+', label: 'National & International Collaborations' },
  { id: 'students', value: '1,000+ annually', label: 'Students & Researchers Trained' }
]
