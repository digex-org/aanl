// data/news.ts
import type { Division } from '~/data/divisions'

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

// 👇 derive allowed slugs from divisions.ts
export type DivisionSlug = Division['slug']

export type NewsItem = {
  id: string
  slug: string
  title: string
  excerpt: string
  body: string
  date: string               // ISO date
  category: NewsCategory
  divisionSlug?: DivisionSlug   
  coverImage: string
  featured?: boolean
}

/**
 * In-memory dataset for now (later replace with CMS/API).
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
    date: '2024-10-03',
    category: 'Science',
    divisionSlug: 'center-for-cosmology-and-astrophysics',
    coverImage: 'akopovbd 1.webp',
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
    coverImage: 'news-fetured-img.webp',
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
    date: '2024-11-20',
    category: 'Library',
    divisionSlug: 'experimental-physics',
    coverImage: 'rubakov 1.webp'
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
    date: '2024-11-20',
    category: 'Library',
    divisionSlug: 'cosmology-astrophysics',
    coverImage: 'news-fetured-img.webp'
  }
]

/**
 * Professional & extensible filter type.
 */
export type NewsFilters = {
  divisionSlug?: string
  category?: NewsCategory | 'All'
  categories?: NewsCategory[]        // multi-select filter support
  featuredOnly?: boolean
  limit?: number
  sort?: 'newest' | 'oldest'
}

/**
 * Core query helper. All higher-level helpers use this.
 * This keeps filtering logic in one place.
 */
export function queryNews(filters: NewsFilters = {}): NewsItem[] {
  const {
    divisionSlug,
    category,
    categories,
    featuredOnly,
    limit,
    sort = 'newest'
  } = filters

  let list = [...NEWS]

  // Filter by division
  if (divisionSlug) {
    list = list.filter(item => item.divisionSlug === divisionSlug)
  }

  // Filter by category (single)
  if (category && category !== 'All') {
    list = list.filter(item => item.category === category)
  }

  // Filter by multiple categories (if provided)
  if (categories && categories.length) {
    const set = new Set<NewsCategory>(categories)
    list = list.filter(item => set.has(item.category))
  }

  // Featured only
  if (featuredOnly) {
    list = list.filter(item => item.featured)
  }

  // Sort by date
  list.sort((a, b) => {
    const da = +new Date(a.date)
    const db = +new Date(b.date)
    return sort === 'oldest' ? da - db : db - da // newest first by default
  })

  // Limit
  if (typeof limit === 'number' && limit > 0) {
    list = list.slice(0, limit)
  }

  return list
}

/**
 * Simple helpers built on top of queryNews,
 * so the rest of the app calls high-level functions.
 */

export function getNewsBySlug(slug: string): NewsItem | undefined {
  return NEWS.find(n => n.slug === slug)
}

export function getDivisionNews(
  divisionSlug: string,
  extraFilters: Omit<NewsFilters, 'divisionSlug'> = {}
): NewsItem[] {
  return queryNews({ divisionSlug, ...extraFilters })
}

export function getAllNews(): NewsItem[] {
  return queryNews({ sort: 'newest' })
}

export function getFeaturedNews(limit = 6): NewsItem[] {
  // If no explicit featured items, fallback to newest
  const featured = queryNews({ featuredOnly: true, limit })
  return featured.length ? featured : queryNews({ limit })
}

/**
 * Unique list of categories present in NEWS.
 * Useful for building filters in the UI.
 */
export function getNewsCategories(): NewsCategory[] {
  const set = new Set<NewsCategory>()
  for (const n of NEWS) {
    set.add(n.category)
  }
  return Array.from(set)
}
