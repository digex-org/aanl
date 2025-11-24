// data/navigation.ts

export type NavLink = {
  label: string
  labelKey?: string   // i18n key, e.g. "nav.about.mission"
  href: string
  external?: boolean
  target?: '_blank' | '_self'
}

export type NavGroup = {
  title?: string
  titleKey?: string   // i18n key for column / group titles
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
}

export const NAV: TopLevelNav[] = [
  {
    label: 'About',
    labelKey: 'nav.top.about',
    href: '/about',
    mega: {
      columns: [
        {
          items: [
            {
              label: 'Mission',
              labelKey: 'nav.about.mission',
              href: '/about/mission'
            },
            {
              label: 'History',
              labelKey: 'nav.about.history',
              href: '/about/history'
            },
            {
              label: 'Board of trustees',
              labelKey: 'nav.about.boardOfTrustees',
              href: '/about/board-of-trustees'
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
    mega: {
      columns: [
        {
          title: 'Research divisions',
          titleKey: 'nav.divisions.researchDivisions',
          items: [
            {
              label: 'Experimental physics',
              labelKey: 'nav.divisions.experimentalPhysics',
              href: '/divisions/experimental-physics'
            },
            {
              label: 'Cosmology & astrophysics',
              labelKey: 'nav.divisions.cosmologyAstrophysics',
              href: '/divisions/cosmology-astrophysics'
            },
            {
              label: 'Quantum technologies',
              labelKey: 'nav.divisions.quantumTechnologies',
              href: '/divisions/quantum-technologies'
            },
            {
              label: 'Applied physics',
              labelKey: 'nav.divisions.appliedPhysics',
              href: '/divisions/applied-physics'
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
    mega: {
      columns: [
        {
          title: 'Events',
          titleKey: 'nav.science.eventsHeading',
          items: [
            {
              label: 'Seminars',
              labelKey: 'nav.science.seminars',
              href: '/science/seminars'
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
    mega: {
      columns: [
        {
          title: 'Events',
          titleKey: 'nav.news.eventsHeading',
          items: [
            {
              label: 'Seminars',
              labelKey: 'nav.news.seminars',
              href: '/science/seminars'
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
              href: '/education/postgraduate-studies'
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
                  href: '/education/postgraduate-studies/admission/first-stage'
                },
                {
                  label: '2nd stage admission',
                  labelKey: 'nav.education.postgrad.secondStage',
                  href: '/education/postgraduate-studies/admission/second-stage'
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
                  href: '/education/postgraduate-studies/distance/first-stage'
                },
                {
                  label: '2nd stage admission',
                  labelKey: 'nav.education.postgrad.distanceSecondStage',
                  href: '/education/postgraduate-studies/distance/second-stage'
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
                  href: '/education/postgraduate-studies/application-form'
                }
              ]
            },
            {
              items: [
                {
                  label: 'Program',
                  labelKey: 'nav.education.postgrad.program',
                  href: '/education/postgraduate-studies/program'
                },
                {
                  label: 'Exams',
                  labelKey: 'nav.education.postgrad.exams',
                  href: '/education/postgraduate-studies/exams'
                },
                {
                  label: 'Schedule',
                  labelKey: 'nav.education.postgrad.schedule',
                  href: '/education/postgraduate-studies/schedule'
                },
                {
                  label: 'Students',
                  labelKey: 'nav.education.postgrad.students',
                  href: '/education/postgraduate-studies/students'
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
              href: '/education/lecturers/required-documents'
            },
            {
              label: 'Exam schedule',
              labelKey: 'nav.education.lecturers.examSchedule',
              href: '/education/lecturers/exam-schedule'
            },
            {
              label: 'Important documents (tuition fee amount)',
              labelKey: 'nav.education.lecturers.tuitionFees',
              href: '/education/lecturers/tuition-fees'
            },
            {
              label: 'Foreign students',
              labelKey: 'nav.education.lecturers.foreignStudents',
              href: '/education/lecturers/foreign-students'
            },
            {
              label: 'Educational and development programs (courses)',
              labelKey: 'nav.education.lecturers.programs',
              href: '/education/lecturers/programs'
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
                  href: '/education/lecturers/professional-council/a0402'
                },
                {
                  label: 'A 04 14',
                  labelKey: 'nav.education.lecturers.a0414',
                  href: '/education/lecturers/professional-council/a0414'
                }
              ]
            },
            {
              items: [
                {
                  label: 'Nearby defenses',
                  labelKey: 'nav.education.lecturers.nearbyDefenses',
                  href: '/education/lecturers/nearby-defenses'
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
    href: '/contact'
  }
]

// unchanged helper, but keep labelKey on top-level links
export function mobileNavLinks(nav: TopLevelNav[] = NAV): NavLink[] {
  const out: NavLink[] = []
  for (const item of nav) {
    if (item.href) {
      out.push({
        label: item.label,
        labelKey: item.labelKey,
        href: item.href
      })
    }
    if (item.mega?.columns?.length) {
      for (const col of item.mega.columns) {
        if (col.items) out.push(...col.items)
        if (col.groups) {
          for (const g of col.groups) {
            if (g.items) out.push(...g.items)
          }
        }
      }
    }
  }
  const seen = new Set<string>()
  return out.filter(l =>
    l.href && !seen.has(l.href) ? (seen.add(l.href), true) : false
  )
}

export default NAV
