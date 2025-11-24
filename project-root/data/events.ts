// data/events.ts
export type EventItem = {
  id: string | number
  slug: string
  title: string
  href?: string
  date: string        // ISO date
  time?: string
  blurb?: string
  accent?: 'blue' | 'pink' | 'orange' | 'green'
}

export const events: EventItem[] = [
  {
    id: 1,
    slug: 'evolving-universe-starobinsky-conference',
    title: 'Evolving Universe: Theory and Observations Starobinsky Memorial Conference',
    date: '2025-09-07T10:00:00+04:00',
    href: '/events/evolving-universe-starobinsky-conference',
    time: '10:00–11:30',
    blurb: 'A conference dedicated to the memory of Alexei Starobinsky, focusing on recent advancements in cosmology and theoretical physics.',
    accent: 'blue'
  },
  {
    id: 2,
    slug: '75th-anniversary-prof-akopov',
    title: '75th anniversary of prof. Norayr Akopov',
    href: '/events/75th-anniversary-prof-akopov',
    date: '2025-09-18T10:00:00+04:00',
    time: '10:00–11:30',
    blurb: 'Celebrating the 75th birthday of Prof. Norayr Akopov with a series of lectures and events highlighting his contributions to physics.',
    accent: 'pink'
  },
  {
    id: 3,
    slug: 'international-conference-particle-cosmology-rubakov',
    title: 'International Conference on Particle Physics and Cosmology dedicated to Prof. Rubakov memory',
    href: '/events/international-conference-particle-cosmology-rubakov',
    date: '2025-09-29T10:00:00+04:00',
    time: '10:00–11:30',
    blurb: 'An international gathering of physicists to discuss recent developments in particle physics and cosmology in honor of Prof. Rubakov.',
    accent: 'orange'
  },
  {
    id: 4,
    slug: 'vi-matinyan-seminar-blue',
    title: 'VI Matinyan seminar',
    href: '/events/vi-matinyan-seminar-blue',
    date: '2025-10-04T10:00:00+04:00',
    time: '10:00–11:30',
    blurb: 'The sixth seminar in the Matinyan series, focusing on recent research and developments in theoretical physics.',
    accent: 'green'
  },
  {
    id: 5,
    slug: 'vi-matinyan-seminar-pink',
    title: 'VI Matinyan seminar',
    href: '/events/vi-matinyan-seminar-pink',
    date: '2025-10-04T10:00:00+04:00',
    time: '10:00–11:30',
    blurb: 'The sixth seminar in the Matinyan series, focusing on recent research and developments in theoretical physics.',
    accent: 'pink'
  },
  {
    id: 6,
    slug: 'vi-matinyan-seminar-orange',
    title: 'VI Matinyan seminar',
    href: '/events/vi-matinyan-seminar-orange',
    date: '2025-10-04T10:00:00+04:00',
    time: '10:00–11:30',
    accent: 'orange'
  }
]

export function getAllEvents(): EventItem[] {
  return events
}
