import { useRoute, useRouter } from 'vue-router'
import { computed } from 'vue'
import { titleFromSlug } from '~/utils/strings'

export type Crumb = { label: string; to?: string }

export function useBreadcrumbs(options?: {
  /** optional override for the last label (e.g., entity title) */
  currentLabel?: string | null
  /** map path segments -> labels (e.g., divisions => 'Divisions') */
  segmentLabels?: Record<string, string>
}) {
  const route = useRoute()
  const router = useRouter()

  const crumbs = computed<Crumb[]>(() => {
    const segments = route.path.split('?')[0].split('#')[0].split('/').filter(Boolean)
    const list: Crumb[] = [{ label: 'Home', to: '/' }]

    // Build progressively: /a, /a/b, /a/b/c
    let acc = ''
    segments.forEach((seg, idx) => {
      acc += `/${seg}`
      const isLast = idx === segments.length - 1

      // Label strategy:
      // 1) explicit mapping
      // 2) route meta.title (if set on matched record)
      // 3) humanize slug
      const matched = route.matched[idx + 1] // +1 because matched[0] is root
      const metaTitle = matched?.meta?.breadcrumb ?? matched?.meta?.title

      let label =
        options?.segmentLabels?.[seg] ||
        (typeof metaTitle === 'function' ? metaTitle(route) : metaTitle) ||
        titleFromSlug(seg)

      // Allow last label override via options.currentLabel
      if (isLast && options?.currentLabel) label = options.currentLabel

      list.push(isLast ? { label } : { label, to: acc })
    })

    // Ensure unique / no trailing duplicates
    return list
  })

  /** JSON-LD for SEO */
  const jsonLd = computed(() => {
    const base = typeof window !== 'undefined' ? window.location.origin : ''
    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': crumbs.value.map((c, i) => ({
        '@type': 'ListItem',
        'position': i + 1,
        'name': c.label,
        ...(c.to ? { 'item': base + c.to } : {})
      }))
    }
  })

  return { crumbs, jsonLd }
}
