// utils/images.ts
/**
 * Creates a simple "filename -> URL" resolver from an import.meta.glob result.
 *
 * Usage:
 *   const mods = import.meta.glob('~/assets/images/.../*', { eager: true, import: 'default' })
 *   const resolveImage = createImageResolver(mods)
 *   const src = resolveImage('my-image.webp')
 */
export function createImageResolver(mods: Record<string, string>) {
  const byFile = Object.fromEntries(
    Object.entries(mods).map(([path, url]) => [path.split('/').pop()!, url])
  )

  return (file: string): string => byFile[file] || file
}
