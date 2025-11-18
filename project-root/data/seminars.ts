// data/seminars.ts

/**
 * Data model and helpers for seminars / conferences.
 * Images are expected in: ~/assets/images/seminars/*
 */

export const SEMINAR_TYPES = ['seminar', 'conference', 'workshop'] as const
export type SeminarKind = (typeof SEMINAR_TYPES)[number]

export const SEMINAR_TOPICS = [
  'fundamental-physics',
  'particle-physics',
  'cosmology',
  'education-outreach',
  'anniversary',
] as const
export type SeminarTopic = (typeof SEMINAR_TOPICS)[number]

export type SeminarItem = {
  id: number
  slug: string
  title: string
  /**
   * Short summary used on the listing card.
   */
  excerpt: string
  /**
   * Full body text for the detail page.
   * Use double newlines (\n\n) to separate paragraphs.
   */
  body: string
  /**
   * ISO date string, e.g. "2025-02-05".
   */
  date: string
  /**
   * Optional local time, e.g. "18:30".
   */
  time?: string
  /**
   * Seminar / conference / workshop.
   */
  kind: SeminarKind
  /**
   * Logical topic (used for filters).
   */
  topic: SeminarTopic
  /**
   * Optional human-readable location.
   */
  location?: string
  /**
   * Optional related division slug to connect with /divisions/[slug].
   */
  divisionSlug?: string
  /**
   * File name in ~/assets/images/seminars/*
   */
  coverImage: string
}

/**
 * Main seminars collection.
 * Replace text and image names with your real data.
 */
export const SEMINARS: SeminarItem[] = [
  {
    id: 1,
    slug: 'first-release-of-lares-2-space-experiment',
    title:
      'The first release of LARES-2 space experiment results on testing fundamental physics',
    excerpt:
      'Join us on February 5 at 6:30 p.m. to hear the first results from the LARES-2 satellite mission and their implications for testing General Relativity and alternative theories of gravity.',
    body: `
About the event: the seminar will present the very first analysis of data from the LARES-2 satellite, a high-precision mission designed to probe the predictions of General Relativity in the Earth’s gravitational field.

The speaker will review the main scientific goals of LARES-2, the measurement strategy, and the data-reduction pipeline. Particular attention will be paid to the tests of frame-dragging and possible deviations from Einstein’s theory.

The talk is aimed at a broad physics audience, including graduate students, and will be followed by an extended Q&A session.
    `.trim(),
    date: '2025-02-05',
    time: '18:30',
    kind: 'seminar',
    topic: 'fundamental-physics',
    location: 'AANL Small Auditorium, EPIC Incubation Program',
    divisionSlug: 'theoretical-physics',
    coverImage: 'akopovbd 1.webp',
  },
  {
    id: 2,
    slug: '75th-anniversary-of-prof-norayr-akopov',
    title: '75th anniversary of Prof. Norayr Akopov',
    excerpt:
      'A commemorative seminar celebrating the scientific legacy of Prof. Norayr Akopov, featuring talks by his students and collaborators on modern trends in experimental physics.',
    body: `
The event is dedicated to the 75th anniversary of Prof. Norayr Akopov, whose work has had a deep and lasting impact on experimental high-energy physics in Armenia and beyond.

The program includes short presentations by his colleagues and former students, highlighting both historical milestones and current projects that build on his ideas.

The seminar will conclude with an open discussion on the future development of the corresponding research directions at AANL.
    `.trim(),
    date: '2025-02-22',
    time: '15:00',
    kind: 'seminar',
    topic: 'anniversary',
    location: 'AANL Main Conference Hall',
    divisionSlug: 'experimental-physics',
    coverImage: 'rubakov 1.webp',
  },
  {
    id: 3,
    slug: 'particle-physics-and-cosmology-conference-rubakov-memory',
    title:
      'International Conference on Particle Physics and Cosmology dedicated to Prof. Rubakov memory',
    excerpt:
      'An international conference bringing together leading experts in particle physics and cosmology, with a special session in memory of Prof. Valery Rubakov.',
    body: `
This multi-day conference covers a broad spectrum of topics at the interface of particle physics and cosmology: dark matter, early-Universe dynamics, baryogenesis, and beyond-Standard-Model scenarios.

A special memorial session will be devoted to the scientific heritage of Prof. Valery Rubakov, whose pioneering contributions shaped several modern research directions.

Young researchers are particularly encouraged to participate; a limited number of contributed talks and posters will be selected by the scientific committee.
    `.trim(),
    date: '2025-03-10',
    time: '10:00',
    kind: 'conference',
    topic: 'cosmology',
    location: 'AANL Large Conference Hall',
    divisionSlug: 'cosmic-ray-physics',
    coverImage: 'news-fetured-img.webp',
  },
  {
    id: 4,
    slug: 'epic-incubation-program-graduation-pitch-day',
    title: 'EPIC Incubation Program – Graduation Pitch Day',
    excerpt:
      'Final pitch day of the EPIC Incubation Program, where teams present their research-driven startups in front of mentors, investors, and the AANL community.',
    body: `
The EPIC Incubation Program supports teams that translate research results into innovative products and services. During the Graduation Pitch Day, each team will give a short presentation of their project, followed by Q&A.

The event will also include a roundtable discussion on best practices for deep-tech entrepreneurship in Armenia, as well as networking opportunities with mentors and partners.

Participation is free, but registration is required due to limited seating.
    `.trim(),
    date: '2025-04-02',
    time: '16:00',
    kind: 'workshop',
    topic: 'education-outreach',
    location: 'AUA EPIC Auditorium',
    coverImage: 'news-fetured-img.webp',
  },
  {
    id: 5,
    slug: 'recent-advances-in-imaging-atmospheric-cherenkov-telescopes',
    title: 'Recent advances in imaging atmospheric Cherenkov telescopes',
    excerpt:
      'A technical seminar on the latest detector technologies and analysis techniques for imaging atmospheric Cherenkov telescopes used in gamma-ray astrophysics.',
    body: `
The seminar will review modern developments in imaging atmospheric Cherenkov telescopes (IACTs), including new mirror designs, camera technologies, and real-time reconstruction algorithms.

Special emphasis will be placed on the role of AANL in international collaborations such as MAGIC and H.E.S.S., as well as prospects for future projects.

The talk will be of interest to researchers working in high-energy astrophysics, detector development, and data analysis.
    `.trim(),
    date: '2025-04-18',
    time: '11:00',
    kind: 'seminar',
    topic: 'particle-physics',
    location: 'AANL Seminar Room 2',
    coverImage: 'news-fetured-img.webp',
  },
  {
    id: 6,
    slug: 'graduate-school-orientation-for-young-researchers',
    title: 'Graduate school orientation for young researchers',
    excerpt:
      'An informational session for students and early-career researchers on graduate programs, fellowships, and career paths in high-energy and nuclear physics.',
    body: `
This outreach seminar is aimed at undergraduate and master students who are considering a research career in physics.

Speakers from different AANL divisions will briefly present available graduate programs, typical research topics, and funding opportunities. The session will end with an open Q&A and informal networking.

The event is part of AANL’s broader strategy to support the next generation of scientists in Armenia.
    `.trim(),
    date: '2025-05-03',
    time: '14:00',
    kind: 'seminar',
    topic: 'education-outreach',
    location: 'AANL Main Conference Hall',
    coverImage: 'news-fetured-img.webp',
  },
]

/* ------------------------------------------------------------------ */
/* Helper functions                                                   */
/* ------------------------------------------------------------------ */

/**
 * Return a new array of all seminars, sorted by date (newest first).
 */
export function getAllSeminars(): SeminarItem[] {
  return [...SEMINARS].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
}

/**
 * Find a single seminar by its slug.
 */
export function getSeminarBySlug(slug: string): SeminarItem | undefined {
  return SEMINARS.find((s) => s.slug === slug)
}

/**
 * Filter seminars by kind (seminar / conference / workshop).
 */
export function getSeminarsByKind(kind: SeminarKind): SeminarItem[] {
  return getAllSeminars().filter((s) => s.kind === kind)
}

/**
 * Filter seminars by topic key.
 */
export function getSeminarsByTopic(topic: SeminarTopic): SeminarItem[] {
  return getAllSeminars().filter((s) => s.topic === topic)
}

/**
 * Optionally filter by division, then return upcoming seminars
 * (date >= today), limited to `limit` items.
 */
export function getUpcomingSeminars(
  limit = 4,
  divisionSlug?: string
): SeminarItem[] {
  const today = new Date()
  const base = getAllSeminars().filter((s) => {
    const d = new Date(s.date)
    const matchesDivision = divisionSlug ? s.divisionSlug === divisionSlug : true
    return matchesDivision && d.getTime() >= today.setHours(0, 0, 0, 0)
  })

  return base.slice(0, limit)
}
