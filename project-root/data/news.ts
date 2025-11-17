// data/news.ts
export type NewsCategory =
  | 'Conference'
  | 'Education'
  | 'Events'
  | 'Partners'
  | 'Research'
  | 'Science'
  | 'Library'
  | 'International relations'
  | 'Other'

export type NewsItem = {
  id: string
  slug: string
  title: string
  excerpt: string
  body: string               // plain text / markdown-ish
  date: string               // ISO date, e.g. "2024-12-01"
  category: NewsCategory
  divisionSlug?: string      // optional – to bind to a division
  coverImage: string         // file name in assets/images/news/*
  featured?: boolean
}

/**
 * Replace this with CMS/API later.
 */
const NEWS: NewsItem[] = [
  {
    id: 'lares-women-girls-science',
    slug: '11-february-international-day-of-women-and-girls-in-science',
    title: '11 of February is the International Day of Women and Girls in Science!',
    excerpt:
      'The LARES-2 space experiment to test General Relativity received its first release in The European Physical Journal Plus, highlighting the contribution of women in science and technology.',
    body: `
The International Day of Women and Girls in Science is an annual observance adopted by the United Nations General Assembly to promote the full and equal access and participation of women in Science, Technology, Engineering and Mathematics (STEM) fields.

The LARES-2 space experiment, conducted by the Italian Space Agency (ASI), provides a significant advance in testing General Relativity. The results are in complete agreement with the predictions of Einstein’s theory.

Tremendous work and huge efforts by a group of leading scholars, among them Nobel laureate Sir Roger Penrose, including Prof. Vahagn Gurzadyan, head of the AANL Center for Cosmology and Astrophysics, made this project possible.

The article is dedicated to the great physicist John Archibald Wheeler and is available at https://doi.org/10.1140/epjp/s13360-023-04596-6.
    `.trim(),
    date: '2024-12-01',
    category: 'Science',
    divisionSlug: 'center-for-cosmology-and-astrophysics',
    coverImage: 'news-fetured-img.webp',
    featured: true
  },
  {
    id: 'particle-physics-conference',
    slug: 'international-conference-on-particle-physics-and-cosmology',
    title:
      'International Conference on Particle Physics and Cosmology dedicated to Prof. Rubakov memory',
    excerpt:
      'AANL hosted an international conference on particle physics and cosmology bringing together researchers from leading institutes worldwide.',
    body: `
AANL hosted an international conference on particle physics and cosmology dedicated to the memory of Prof. Rubakov.

The conference brought together researchers from leading institutes worldwide to discuss recent advances in high-energy physics, cosmology and related fields.
    `.trim(),
    date: '2024-12-22',
    category: 'Conference',
    divisionSlug: 'experimental-physics-division',
    coverImage: 'akopovbd 1.webp',
    featured: false
  },
  {
    id: 'rubakov-library-article',
    slug: 'rubakov-library-article',
    title:
      'Library highlight: resources on particle physics and cosmology dedicated to Prof. Rubakov',
    excerpt:
      'The AANL library presents a curated collection of works on particle physics and cosmology, honoring the scientific legacy of Prof. Rubakov.',
    body: `
The AANL library has curated a special collection of works on particle physics and cosmology dedicated to the memory of Prof. Rubakov.

The collection includes key monographs, textbooks and review articles that have shaped the modern understanding of high-energy physics and cosmology.
    `.trim(),
    date: '2024-12-22',
    category: 'Library',
    divisionSlug: 'experimental-physics',
    coverImage: 'rubakov 1.webp'
  }
  // add more items as needed
]

export function getNewsBySlug(slug: string): NewsItem | undefined {
  return NEWS.find(n => n.slug === slug)
}

export function getDivisionNews(divisionSlug: string): NewsItem[] {
  return getAllNews().filter(n => n.divisionSlug === divisionSlug)
}

export function getAllNews(): NewsItem[] {
  // Optional: keep list sorted newest → oldest
  return [...NEWS].sort(
    (a, b) => +new Date(b.date) - +new Date(a.date)
  )
}

export function getFeaturedNews(limit = 6): NewsItem[] {
  const list = NEWS.filter(n => n.featured)
  return (list.length ? list : getAllNews()).slice(0, limit)
}
