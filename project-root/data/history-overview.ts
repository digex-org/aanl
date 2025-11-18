// data/history-overview.ts
export type HistoryBlock = {
  type: 'text' | 'image' | 'imageRow'
  content?: string
  images?: string[]
}

export const HISTORY_OVERVIEW: HistoryBlock[] = [
  {
    type: 'text',
    content: `Yerevan Physics Institute (YerPhI) was founded by eminent physicists...`
  },
  {
    type: 'image',
    images: ['history-1970.webp']
  },
  {
    type: 'text',
    content: `An important milestone in history of the Institute is the construction...`
  },
  {
    type: 'imageRow',
    images: ['history-1970.webp', 'history-1970.webp']
  },
  // ...
]
