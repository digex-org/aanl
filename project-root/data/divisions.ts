// src/data/divisions.ts
export type Division = {
  slug: string
  title: string
  titleKey?: string
  excerpt: string
  excerptKey?: string
  image: string
  accent?: 'blue' | 'pink' | 'orange' | 'green' | 'purple' | 'teal'
}

export const divisions: Division[] = [
  {
    slug: 'experimental-physics',
    title: 'Experimental physics division',
    excerpt:
      'Longstanding research in high-energy experimental physics, including work with the Yerevan electron synchrotron (ARUS) up to 6 GeV.',
    image: 'Leonardo_Phoenix_A_futuristic_experimental.webp',
    accent: 'blue'
  },
  {
    slug: 'theoretical-physics',
    title: 'Matinyan center for theoretical physics',
    excerpt:
      'Theoretical physics at AANL with a focus on fundamental models, field theory, and modern mathematical methods.',
    image: 'dan-cristian-padure.webp',
    accent: 'pink'
  },
  {
    slug: 'cosmology-astrophysics',
    title: 'Center for cosmology and astrophysics',
    excerpt:
      'Non-linear effects in cosmology, structure of the universe, gravitational dynamics, and time-series of complex systems.',
    image: 'Leonardo_Phoenix_A_futuristic_experimental.webp',
    accent: 'purple'
  },
  {
    slug: 'quantum-technologies',
    title: 'Division for Quantum Technologies',
    excerpt:
      'Quantum computation and theoretical calculations of quantum technologies with results published in leading journals.',
    image: 'Leonardo_Phoenix_A_breathtaking.webp',
    accent: 'green'
  },
  {
    slug: 'cosmic-rays', // #5
    title: 'Cosmic ray division',
    excerpt:
      'Aragats high-mountain stations and SEVAN network studies; space weather, radiation, and atmospheric phenomena.',
    image: 'Leonardo_Phoenix_A_stateoftheart_Division_for_Quantum_Technolo.webp',
    accent: 'blue'
  },
  {
    slug: 'computational-physics-it', // #6 — changed to avoid adjacent blue
    title: 'Computational physics and IT division',
    excerpt:
      'Scientific software, data pipelines, numerical simulations, network resources and HPC for experimental programs.',
    image: 'Leonardo_Phoenix_A_futuristic_experimental.webp',
    accent: 'teal' 
  },
  {
    slug: 'applied-physics',
    title: 'Applied physics research division',
    excerpt:
      'Materials science, radiation-matter interaction, optical/biological properties, and device-level applications.',
    image: 'Leonardo_Phoenix_Photorealistic_depiction_of_quantum_physics.webp',
    accent: 'orange'
  },
  {
    slug: 'isotopes-production',
    title: 'Isotopes research and production division',
    excerpt:
      'Development of technologies for radioactive isotope production for medical and industrial applications.',
    image: 'Leonardo_Phoenix_A_futuristic_experimental.webp',
    accent: 'teal'
  }
]
