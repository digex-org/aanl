// data/navigation.ts

export type NavLink = {
  label: string
  href: string
  labelKey?: string        // i18n key, e.g. "nav.about.mission"
  external?: boolean
  target?: '_blank' | '_self'
  icon?: string            // optional icon URL/path
}

export type NavGroup = {
  title?: string
  titleKey?: string        // i18n key for column / group titles
  items?: NavLink[]
  groups?: NavGroup[]
}

export type TopLevelNav = {
  label: string
  labelKey?: string
  href?: string
  mega?: {
    width?: 'md' | 'lg' | 'xl'
    columns: NavGroup[]
  }
  icon?: string            // optional icon for top-level item
}

// NOTE: icon paths are placeholders – adjust to match your assets structure
export const NAV: TopLevelNav[] = [
  {
    label: 'About',
    labelKey: 'nav.top.about',
    href: '/about',
    icon: '/images/nav/history-1943.webp',
    mega: {
      columns: [
        {
          items: [
            {
              label: 'Mission',
              labelKey: 'nav.about.mission',
              href: '/about/mission',

            },
            {
              label: 'History',
              labelKey: 'nav.about.history',
              href: '/about/history',

            },
            {
              label: 'Board of trustees',
              labelKey: 'nav.about.boardOfTrustees',
              href: '/about/board-of-trustees',

            }
          ]
        }
      ]
    }
  },

  {
    label: 'Divisions',
    labelKey: 'nav.top.divisions',
    href: '/divisions',
    icon: '/images/nav/Leonardo_Phoenix_Photorealistic_depiction_of_quantum_physics.webp',

    mega: {
      columns: [
        {
          title: 'Research divisions',
          titleKey: 'nav.divisions.researchDivisions',
          items: [
            {
              label: 'Experimental physics',
              labelKey: 'nav.divisions.experimentalPhysics',
              href: '/divisions/experimental-physics',

            },
            {
              label: 'Cosmology & astrophysics',
              labelKey: 'nav.divisions.cosmologyAstrophysics',
              href: '/divisions/cosmology-astrophysics',
       
            },
            {
              label: 'Quantum technologies',
              labelKey: 'nav.divisions.quantumTechnologies',
              href: '/divisions/quantum-technologies',

            },
            {
              label: 'Applied physics',
              labelKey: 'nav.divisions.appliedPhysics',
              href: '/divisions/applied-physics',

            }
          ]
        }
      ]
    }
  },

  {
    label: 'Science',
    labelKey: 'nav.top.science',
    href: '/science',
    icon: '/images/nav/Leonardo_Phoenix_Photorealistic_depiction_of_quantum_physics.webp',
    mega: {
      columns: [
        {
          title: 'Events',
          titleKey: 'nav.science.eventsHeading',
          items: [
            {
              label: 'Seminars',
              labelKey: 'nav.science.seminars',
              href: '/seminars',

            }
          ]
        }
      ]
    }
  },

  {
    label: 'News',
    labelKey: 'nav.top.news',
    href: '/news',
    icon: '/images/nav/Leonardo_Phoenix_Photorealistic_depiction_of_quantum_physics.webp',
    mega: {
      columns: [
                {
          title: 'News',
          titleKey: 'nav.news.eventsHeading',
          items: [
            {
              label: 'All News',
              labelKey: 'nav.news.news',
              href: '/news',

            }
          ]
        },
        {
          title: 'Events',
          titleKey: 'nav.news.eventsHeading',
          items: [
            {
              label: 'Seminars',
              labelKey: 'nav.news.seminars',
              href: '/seminars',

            }
          ]
        }
      ]
    }
  },

  {
    label: 'Education',
    labelKey: 'nav.top.education',
    href: '/education',
    icon: '/images/nav/admission.webp',
    mega: {
      width: 'xl',
      columns: [
        {
          // Postgraduate studies
          title: 'Postgraduate studies',
          titleKey: 'nav.education.postgrad.title',
          items: [
            {
              label: 'Description',
              labelKey: 'nav.education.postgrad.description',
              href: '/education/postgraduate-study/applicant',

            }
          ],
          groups: [
            {
              title: 'Admission procedure',
              titleKey: 'nav.education.postgrad.admissionProcedure',
              items: []
            },
            {
              title: 'Available training',
              titleKey: 'nav.education.postgrad.availableTraining',
              items: [
                {
                  label: '1st stage admission',
                  labelKey: 'nav.education.postgrad.firstStage',
                  href: '/education/postgraduate-study/admission',
                  icon: '/images/nav/education-postgrad-first-stage.svg'
                },
                {
                  label: '2nd stage admission',
                  labelKey: 'nav.education.postgrad.secondStage',
                  href: '/education/postgraduate-study/admission',

                }
              ]
            },
            {
              title: 'Distance learning',
              titleKey: 'nav.education.postgrad.distanceLearning',
              items: [
                {
                  label: '1st stage admission',
                  labelKey: 'nav.education.postgrad.distanceFirstStage',
                  href: '/education/postgraduate-study/admission',
                  icon: '/images/nav/education-postgrad-distance-first-stage.svg'
                },
                {
                  label: '2nd stage admission',
                  labelKey: 'nav.education.postgrad.distanceSecondStage',
                  href: '/education/postgraduate-study/admission',
                  icon: '/images/nav/education-postgrad-distance-second-stage.svg'
                }
              ]
            },
            {
              title: 'Application form',
              titleKey: 'nav.education.postgrad.applicationForm',
              items: [
                {
                  label: 'Application form',
                  labelKey: 'nav.education.postgrad.applicationForm',
                  href: '/education/postgraduate-study/application-form',

                }
              ]
            },
            {
              items: [
                {
                  label: 'Program',
                  labelKey: 'nav.education.postgrad.program',
                  href: '/education/postgraduate-study/admissionm',
                  icon: '/images/nav/education-postgrad-program.svg'
                },
                {
                  label: 'Exams',
                  labelKey: 'nav.education.postgrad.exams',
                  href: '/education/postgraduate-study/admission',

                },
                {
                  label: 'Schedule',
                  labelKey: 'nav.education.postgrad.schedule',
                  href: '/education/postgraduate-study/admission',

                },
                {
                  label: 'Students',
                  labelKey: 'nav.education.postgrad.students',
                  href: '/education/postgraduate-study/admission',

                }
              ]
            }
          ]
        },

        {
          // Lecturers
          title: 'Lecturers',
          titleKey: 'nav.education.lecturers.title',
          items: [
            {
              label: 'Required documents',
              labelKey: 'nav.education.lecturers.requiredDocuments',
              href: '/education/postgraduate-study/admission',

            },
            {
              label: 'Exam schedule',
              labelKey: 'nav.education.lecturers.examSchedule',
              href: '/education/postgraduate-study/admission',

            },
            {
              label: 'Important documents (tuition fee amount)',
              labelKey: 'nav.education.lecturers.tuitionFees',
              href: '/education/postgraduate-study/admission',

            },
            {
              label: 'Foreign students',
              labelKey: 'nav.education.lecturers.foreignStudents',
              href: '/education/postgraduate-study/admission',

            },
            {
              label: 'Educational and development programs (courses)',
              labelKey: 'nav.education.lecturers.programs',
              href: '/education/postgraduate-study/admission',

            }
          ],
          groups: [
            {
              title: 'DDK 024 Physics Professional Council',
              titleKey: 'nav.education.lecturers.professionalCouncil',
              items: [
                {
                  label: 'A 04 02',
                  labelKey: 'nav.education.lecturers.a0402',
                  href: '/education/postgraduate-study/admission',

                },
                {
                  label: 'A 04 14',
                  labelKey: 'nav.education.lecturers.a0414',
                  href: '/education/postgraduate-study/admission',

                }
              ]
            },
            {
              items: [
                {
                  label: 'Nearby defenses',
                  labelKey: 'nav.education.lecturers.nearbyDefenses',
                  href: '/education/postgraduate-study/admission',
 
                }
              ]
            }
          ]
        }
      ]
    }
  },

  {
    label: 'Contact',
    labelKey: 'nav.top.contact',
    href: '/contact',
    icon: '/images/nav/contact.svg'
  }
]

// Flattened mobile nav links (for mobile drawer)
export function mobileNavLinks(nav: TopLevelNav[] = NAV): NavLink[] {
  const out: NavLink[] = []

  for (const item of nav) {
    if (item.href) {
      // Build object step-by-step to avoid labelKey/icon: undefined
      const base: NavLink = {
        label: item.label,
        href: item.href
      }

      if (item.labelKey) base.labelKey = item.labelKey
      if (item.icon) base.icon = item.icon

      out.push(base)
    }

    if (item.mega?.columns?.length) {
      for (const col of item.mega.columns) {
        if (col.items) {
          out.push(...col.items)
        }
        if (col.groups) {
          for (const g of col.groups) {
            if (g.items) out.push(...g.items)
          }
        }
      }
    }
  }

  // De-duplicate by href
  const seen = new Set<string>()
  return out.filter(link => {
    if (seen.has(link.href)) return false
    seen.add(link.href)
    return true
  })
}

export default NAV
