// src/data/division-details.ts
// Rich, per-division content used by pages/divisions/[slug].vue

export type ExternalLink = {
  label: string
  href: string
}

export type Collaboration = {
  text: string
  links?: ExternalLink[]
}

export type QuickLink = {
  label: string
  to: string          // internal route
}

export type DivisionDetails = {
  /** must match divisions.ts slug */
  slug: string

  /** Optional: override banner image (filename in assets/images/divisions) */
  bannerImage?: string

  /** 2–6 short paragraphs. Use \n\n between paragraphs for readability. */
  overview: string

  /** Right sidebar quick access items */
  quickAccess: QuickLink[]

  /** External scientific partners per division */
  collaborations: Collaboration[]

  /** Optional: careers highlight section */
  careers?: {
    title: string
    body: string
    ctaLabel?: string
    ctaTo?: string
  }
}

/** Helper to build quick-access routes by slug */
const qa = (slug: string): QuickLink[] => ([
  { label: 'Employees', to: `/divisions/${slug}/employees` },
  { label: 'News',      to: `/divisions/${slug}/news` },
  { label: 'Seminars',  to: `/divisions/${slug}/seminars` }
])

/** Canonical partner links reused across divisions */
const LINKS = {
  CERN:       { label: 'CERN–LHC', href: 'https://home.cern' },
  ATLAS:      { label: 'ATLAS', href: 'https://atlas.cern' },
  ALICE:      { label: 'ALICE', href: 'https://alice.cern' },
  CMS:        { label: 'CMS', href: 'https://cms.cern' },
  AMBER:      { label: 'AMBER', href: 'https://amber.web.cern.ch' },
  DESY:       { label: 'DESY', href: 'https://www.desy.de' },
  JLAB:       { label: 'JLab', href: 'https://www.jlab.org' },
  HESS:       { label: 'HESS', href: 'https://www.mpi-hd.mpg.de/hfm/HESS' },
  CTA:        { label: 'CTA', href: 'https://www.cta-observatory.org' },
  FERMILAB:   { label: 'FermiLab', href: 'https://www.fnal.gov' },
  SPINQUEST:  { label: 'SpinQuest', href: 'https://spinquest.fnal.gov' },
  JINR:       { label: 'Joint Institute for Nuclear Research (JINR)', href: 'https://www.jinr.ru' },
  GLASGOW:    { label: 'University of Glasgow', href: 'https://www.gla.ac.uk' },
  ELI_NP:     { label: 'ELI–NP', href: 'https://www.eli-np.ro' },
  HLYS:       { label: 'HİyS', href: 'https://hlys.org' },
  GUTENBERG:  { label: 'Gutenberg University', href: 'https://www.uni-mainz.de' },
  TOHOKU:     { label: 'Tohoku University', href: 'https://www.tohoku.ac.jp' },
  BNL:        { label: 'BNL', href: 'https://www.bnl.gov' },
} as const

/** MASTER DATA
 *  Add/adjust copy per division. Keep paragraphs concise (3–6 lines each).
 */
export const divisionDetails: Record<string, DivisionDetails> = {
  // 1) Experimental physics
  'experimental-physics': {
    slug: 'experimental-physics',
    bannerImage: 'Leonardo_Phoenix_A_futuristic_experimental.webp',
    overview:
`The Experimental Physics Division (EPD) leads AANL’s program in accelerator-based and detector-driven research. Our teams operate and upgrade test stands, beamlines, and precision instrumentation used for nuclear and particle physics measurements.

Historically, the division built a global profile running the Yerevan electron synchrotron (ARUS), delivering results across hadron structure, resonance spectroscopy, transition radiation, and beam diagnostics. Today, we continue with calibrated low-energy programs and joint runs on international facilities.

Current work spans detector R&D, radiation effects in materials, electron and proton beam applications, and precision calibration for large collaborations. The division also supports education through internships and graduate theses integrated with active experiments.`,
    quickAccess: qa('experimental-physics'),
    collaborations: [
      { text: 'High energy experimental physics / collaboration with', links: [LINKS.CERN, LINKS.ATLAS, LINKS.ALICE, LINKS.CMS, LINKS.AMBER] },
      { text: 'Hadron physics based on HERMES and H1 data / collaboration with', links: [LINKS.DESY] },
      { text: 'Drell–Yan and Sivers function studies', links: [LINKS.FERMILAB, LINKS.SPINQUEST] },
      { text: 'Joint programs and detector calibrations', links: [LINKS.JINR] },
      { text: 'Academic partners', links: [LINKS.GLASGOW] },
    ],
    careers: {
      title: 'Career and Education Opportunities',
      body:
`Open positions include PhD, junior researcher, and engineer roles on beam tests, detector electronics, and data acquisition. Students can join collaborative projects with CERN, JLab, Fermilab, and BNL and attend partner schools and internships.`,
      ctaLabel: 'Learn More',
      ctaTo: '/careers'
    }
  },

  // 2) Matinyan center for theoretical physics
  'theoretical-physics': {
    slug: 'theoretical-physics',
    bannerImage: 'dan-cristian-padure.webp',
    overview:
`The Matinyan Center advances theoretical frameworks for high-energy and nuclear physics, gravitation, and complex systems. We develop analytic and numerical models, collaborate closely with experimental groups, and publish in top journals.

Research threads include QFT and effective theories, non-perturbative methods, cosmology, and transport phenomena in strongly-coupled matter. A growing thrust addresses AI-assisted symbolic reasoning and scientific workflows.`,
    quickAccess: qa('theoretical-physics'),
    collaborations: [
      { text: 'Theory & phenomenology exchanges with international labs', links: [LINKS.CERN, LINKS.DESY, LINKS.JLAB] },
      { text: 'Workshops and visitor programs with universities', links: [LINKS.GLASGOW, LINKS.GUTENBERG, LINKS.TOHOKU] },
    ],
    careers: {
      title: 'Graduate & Postdoc Positions',
      body:
`We host MSc/PhD projects on quantum field theory, cosmology, and complex systems, co-supervised with partner universities. Fellowships are available for strong applicants with publication record or demonstrated research software skills.`,
      ctaLabel: 'Open Calls',
      ctaTo: '/careers'
    }
  },

  // 3) Center for cosmology and astrophysics
  'cosmology-astrophysics': {
    slug: 'cosmology-astrophysics',
    bannerImage: 'Leonardo_Phoenix_A_futuristic_experimental.webp',
    overview:
`The Center studies the large-scale structure and dynamics of the Universe: dark matter/energy models, non-linear growth, and time-domain astrophysics. Methods combine analytical tools, N-body simulations, and statistical inference.

We collaborate on survey pipelines and astrophysical transients, aligning theory with data from space- and ground-based observatories.`,
    quickAccess: qa('cosmology-astrophysics'),
    collaborations: [
      { text: 'Gamma-ray and high-energy astrophysics', links: [LINKS.HESS, LINKS.CTA] },
      { text: 'Data analysis frameworks with partner institutes', links: [LINKS.DESY, LINKS.CERN] },
    ],
    careers: {
      title: 'Astro/Cosmology Studentships',
      body: 'Thesis topics cover non-linear cosmology, strong lensing, and Bayesian inference for survey data. Experience with Python/Julia and HPC is a plus.',
      ctaLabel: 'Apply',
      ctaTo: '/careers'
    }
  },

  // 4) Division for Quantum Technologies
  'quantum-technologies': {
    slug: 'quantum-technologies',
    bannerImage: 'Leonardo_Phoenix_A_breathtaking.webp',
    overview:
`The Quantum Technologies Division explores quantum computation, simulation, and sensing. We pursue device-level theory, error-mitigation protocols, and quantum-enhanced measurement concepts relevant to HEP and materials science.

Projects include hybrid algorithms, noise characterization, and applications of quantum machine learning to detector reconstruction tasks.`,
    quickAccess: qa('quantum-technologies'),
    collaborations: [
      { text: 'Algorithmic development with European consortia' },
      { text: 'Cross-disciplinary projects with HEP collaborations', links: [LINKS.CERN] },
    ],
    careers: {
      title: 'Fellowships in Quantum Algorithms',
      body: 'Candidates with background in QIS, AMO physics, or applied math and experience in Qiskit/Pennylane are encouraged to apply.',
      ctaLabel: 'See Positions',
      ctaTo: '/careers'
    }
  },

  // 5) Cosmic ray division
  'cosmic-rays': {
    slug: 'cosmic-rays',
    bannerImage: 'Leonardo_Phoenix_A_stateoftheart_Division_for_Quantum_Technolo.webp',
    overview:
`CRD operates high-altitude stations on Mt. Aragats, delivering unique time-resolved measurements of cosmic rays, thunderstorms, and space weather. The SEVAN network extends these capabilities internationally.

Our datasets support studies of radiation bursts, atmospheric electricity, and heliospheric modulation, with strong outreach to industry and aviation.`,
    quickAccess: qa('cosmic-rays'),
    collaborations: [
      { text: 'Space weather collaborations and data sharing', links: [LINKS.DESY] },
      { text: 'Observatory partners and European networks', links: [LINKS.CTA] },
    ],
    careers: {
      title: 'Field & Data Roles',
      body: 'We offer positions in station operations, detector maintenance, and real-time analytics. Python/TS + time-series experience is valued.',
      ctaLabel: 'Join CRD',
      ctaTo: '/careers'
    }
  },

  // 6) Computational physics and IT division
  'computational-physics-it': {
    slug: 'computational-physics-it',
    bannerImage: 'Leonardo_Phoenix_A_futuristic_experimental.webp',
    overview:
`This division builds scientific software, HPC workflows, data acquisition pipelines, and research platforms supporting experiments across AANL. We maintain on-prem clusters and cloud integrations with automated observability and reproducibility.

Focus areas: simulation stacks, reconstruction, FAIR data services, AI/ML for physics, and secure research infrastructure.`,
    quickAccess: qa('computational-physics-it'),
    collaborations: [
      { text: 'Computing R&D with HEP collaborations', links: [LINKS.CERN, LINKS.BNL] },
      { text: 'Joint software projects with labs and universities', links: [LINKS.JLAB, LINKS.DESY] },
    ],
    careers: {
      title: 'Software & HPC Openings',
      body: 'We hire research software engineers and DevOps/HPC specialists. Experience with C++/Python, containers, and batch/accelerator scheduling is ideal.',
      ctaLabel: 'See Roles',
      ctaTo: '/careers'
    }
  },

  // 7) Applied physics research division
  'applied-physics': {
    slug: 'applied-physics',
    bannerImage: 'Leonardo_Phoenix_Photorealistic_depiction_of_quantum_physics.webp',
    overview:
`Applied Physics explores radiation–matter interactions, optical and biological properties, and advanced materials. We develop experimental setups, simulation models, and measurement protocols relevant to health, energy, and industry.

Recent results include irradiation studies, optical diagnostics, and device-scale modeling with technology transfer potential.`,
    quickAccess: qa('applied-physics'),
    collaborations: [
      { text: 'Photonuclear and laser-based research programs', links: [LINKS.ELI_NP, LINKS.HLYS] },
      { text: 'Joint materials projects with universities', links: [LINKS.GUTENBERG] },
    ],
    careers: {
      title: 'Industrial & Medical Applications',
      body: 'Projects welcome engineers and experimentalists with optics, detectors, or radiation physics background.',
      ctaLabel: 'Collaborate',
      ctaTo: '/careers'
    }
  },

  // 8) Isotopes research and production division
  'isotopes-production': {
    slug: 'isotopes-production',
    bannerImage: 'Leonardo_Phoenix_A_futuristic_experimental.webp',
    overview:
`The division develops technologies for producing medical and industrial radioisotopes, including target design, irradiation, and radiochemical processing. Quality, safety, and regulatory compliance are integral to our process.

We work with clinics and industry to ensure reliable supply and to prototype next-generation isotope systems.`,
    quickAccess: qa('isotopes-production'),
    collaborations: [
      { text: 'Clinical and industrial partnerships' },
      { text: 'Standards & compliance with international bodies' },
    ],
    careers: {
      title: 'Radiochemistry & Process Engineering',
      body: 'Openings span production engineering, QA/QC, and radiochemical analysis. Experience with GMP and safety systems is an advantage.',
      ctaLabel: 'Contact Team',
      ctaTo: '/careers'
    }
  },
} as const

/** Safe accessor */
export function getDivisionDetails(slug: string): DivisionDetails | undefined {
  return divisionDetails[slug]
}
