export function titleFromSlug(slug: string) {
  return slug
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, m => m.toUpperCase());
}
