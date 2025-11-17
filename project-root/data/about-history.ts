// data/about-history.ts
export type HistoryItem = {
  year: number
  title: string
  body: string
  image: string // file name in assets/images/history/*
}

export const ABOUT_HISTORY: HistoryItem[] = [
  {
    year: 1943,
    title: 'A. I. Alikhanyan National Science Laboratory (AANL)',
    body: 'The Yerevan Institute of Physics (YerPhI) was founded ...',
    image: 'history-1943.webp'
  },
    {
    year: 1962,
    title: 'A. I. Alikhanyan National Science Laboratory (AANL)',
    body: 'The Yerevan Institute of Physics (YerPhI) was founded ...',
    image: 'history-1943.webp'
  },
    {
    year: 1967,
    title: 'A. I. Alikhanyan National Science Laboratory (AANL)',
    body: 'The Yerevan Institute of Physics (YerPhI) was founded ...',
    image: 'history-1943.webp'
  },
    {
    year: 1980,
    title: 'A. I. Alikhanyan National Science Laboratory (AANL)',
    body: 'The Yerevan Institute of Physics (YerPhI) was founded ...',
    image: 'history-1943.webp'
  },
    {
    year: 1985,
    title: 'A. I. Alikhanyan National Science Laboratory (AANL)',
    body: 'The Yerevan Institute of Physics (YerPhI) was founded ...',
    image: 'history-1943.webp'
  },
  // 1962, 1967, 1970, ...
]
