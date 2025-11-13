// data/navigation.ts
/**
 * Global navigation data for the public site.
 * Keep this file "pure" (no composables/imports) so it can be statically treeshaken.
 *
 * Notes:
 * - `labelKey` is optional i18n key. If you use i18n, prefer labelKey; `label` acts as a fallback.
 * - `href` should be absolute-from-root.
 * - `mega.columns` renders a multi-column dropdown (e.g., your Education menu).
 */

export type NavLink = {
  label: string;            // Fallback label
  labelKey?: string;        // i18n key, e.g. "nav.education.postgrad.description"
  href: string;
  external?: boolean;
  target?: '_blank' | '_self';
};

export type NavGroup = {
  title?: string;
  titleKey?: string;
  items?: NavLink[];
  groups?: NavGroup[];      // nested groups (for sectioned lists)
};

export type TopLevelNav = {
  label: string;
  labelKey?: string;
  href?: string;            // Some roots have landing pages, some only mega
  mega?: {
    width?: 'md' | 'lg' | 'xl'; // allows different widths if you need it
    columns: NavGroup[];    // multi-column content
  };
};

//
// ————————————————————————————————————————————————————————————————
// Top-level navigation
// ————————————————————————————————————————————————————————————————
//

export const NAV: TopLevelNav[] = [
  {
    label: 'About',
    href: '/about',
    mega: {
      columns: [
        {
          items: [
            { label: 'Mission', href: '/about/mission' },
            { label: 'History', href: '/about/history' },
            { label: 'Board of trustees', href: '/about/board-of-trustees' }
          ]
        }
      ]
    }
  },
  {
    label: 'Divisions',
    href: '/divisions',
    mega: {
      columns: [
        {
          title: 'Research divisions',
          items: [
            { label: 'Experimental physics', href: '/divisions/experimental-physics' },
            { label: 'Cosmology & astrophysics', href: '/divisions/cosmology-astrophysics' },
            { label: 'Quantum technologies', href: '/divisions/quantum-technologies' },
            { label: 'Applied physics', href: '/divisions/applied-physics' }
          ]
        }
      ]
    }
  },
  {
    label: 'Science',
    href: '/science',
    mega: {
      columns: [
        {
          title: 'Events',
          items: [
            { label: 'Seminars', href: '/science/seminars' }
          ]
        }
      ]
    }
  },
    //
  // ————————————————————————————————————————————————————————————
  //  News  (Mega menu matching your screenshot)
  // ————————————————————————————————————————————————————————————
  //
  {
    label: 'News',
    href: '/news',
     mega: {
      columns: [
        {
          title: 'Events',
          items: [
            { label: 'Seminars', href: '/science/seminars' }
          ]
        }
      ]
    }
  },


  //
  // ————————————————————————————————————————————————————————————
  //  EDUCATION  (Mega menu matching your screenshot)
  // ————————————————————————————————————————————————————————————
  //
  {
    label: 'Education',
    href: '/education',
    mega: {
      width: 'xl',
      columns: [
        //
        // Column 1 — Postgraduate studies (left sidebar style)
        //
        {
          title: 'Postgraduate studies',
          items: [
            { label: 'Description', href: '/education/postgraduate-studies' }
          ],
          groups: [
            {
              title: 'Admission procedure',
              items: []
            },
            {
              title: 'Available training',
              items: [
                { label: '1st stage admission', href: '/education/postgraduate-studies/admission/first-stage' },
                { label: '2nd stage admission', href: '/education/postgraduate-studies/admission/second-stage' }
              ]
            },
            {
              title: 'Distance learning',
              items: [
                { label: '1st stage admission', href: '/education/postgraduate-studies/distance/first-stage' },
                { label: '2nd stage admission', href: '/education/postgraduate-studies/distance/second-stage' }
              ]
            },
            {
              title: 'Application form',
              items: [
                { label: 'Application form', href: '/education/postgraduate-studies/application-form' }
              ]
            },
            {
              items: [
                { label: 'Program',   href: '/education/postgraduate-studies/program' },
                { label: 'Exams',     href: '/education/postgraduate-studies/exams' },
                { label: 'Schedule',  href: '/education/postgraduate-studies/schedule' },
                { label: 'Students',  href: '/education/postgraduate-studies/students' }
              ]
            }
          ]
        },

        //
        // Column 2 — Lecturers
        //
        {
          title: 'Lecturers',
          items: [
            { label: 'Required documents', href: '/education/lecturers/required-documents' },
            { label: 'Exam schedule', href: '/education/lecturers/exam-schedule' },
            { label: 'Important documents (tuition fee amount)', href: '/education/lecturers/tuition-fees' },
            { label: 'Foreign students', href: '/education/lecturers/foreign-students' },
            { label: 'Educational and development programs (courses)', href: '/education/lecturers/programs' }
          ],
          groups: [
            {
              title: 'DDK 024 Physics Professional Council',
              items: [
                { label: 'A 04 02', href: '/education/lecturers/professional-council/a0402' },
                { label: 'A 04 14', href: '/education/lecturers/professional-council/a0414' }
              ]
            },
            {
              items: [
                { label: 'Nearby defenses', href: '/education/lecturers/nearby-defenses' }
              ]
            }
          ]
        }
      ]
    }
  },

  {
    label: 'Contact',
    href: '/contact',

  }
];

//
// ————————————————————————————————————————————————————————————————
// Optional helpers
// ————————————————————————————————————————————————————————————————
//

/**
 * Flatten mega-menu columns into a simple list of links for mobile menus
 * while keeping the same data source.
 */
export function mobileNavLinks(nav: TopLevelNav[] = NAV): NavLink[] {
  const out: NavLink[] = []
  for (const item of nav) {
    if (item.href) out.push({ label: item.label, href: item.href })
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
  // de-duplicate by href
  const seen = new Set<string>()
  return out.filter(l => (l.href && !seen.has(l.href) ? (seen.add(l.href), true) : false))
}

export default NAV
