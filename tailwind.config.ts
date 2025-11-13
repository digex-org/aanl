import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  content: [
    './project-root/app.vue',
    './project-root/components/**/*.{vue,js,ts}',
    './project-root/layouts/**/*.{vue,js,ts}',
    './project-root/pages/**/*.{vue,js,ts}',
    './project-root/plugins/**/*.{js,ts}',
  ],
  darkMode: 'class',  // Recommended for theme support
  theme: {
    container: { center: true, padding: '1rem' },
    extend: {
      colors: { brand: { navy: '#0C1E45', blue: '#2563EB' } },
      borderRadius: { xl: '12px', lg: '10px' },
      boxShadow: { soft: '0 8px 24px rgba(0,0,0,.08)' },
    },
  },
  plugins: [],
};