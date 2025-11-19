// data/postgraduate.ts
export type PostgraduateTabKey =
  | 'applicant'
  | 'admission'
  | 'foreign-citizens'
  | 'application-form'

export type PostgraduateTab = {
  key: PostgraduateTabKey
  label: string
  to: string
}

export const POSTGRAD_TABS: PostgraduateTab[] = [
  { key: 'applicant',         label: 'Applicant',         to: '/education/postgraduate-study/applicant' },
  { key: 'admission',         label: 'Admission',         to: '/education/postgraduate-study/admission' },
  { key: 'foreign-citizens',  label: 'Foreign citizens',  to: '/education/postgraduate-study/foreign-citizens' },
  { key: 'application-form',  label: 'Application form',  to: '/education/postgraduate-study/application-form' }
]

export type PostgraduateTeaserCard = {
  key: string
  title: string
  body: string
  image: string   // file name in assets/images/education/postgraduate/*
  to: string
}

export const APPLICANT_TEASERS: PostgraduateTeaserCard[] = [
  {
    key: 'admission',
    title: 'Admission',
    body: `Information about full-time and part-time PhD admission
at A. I. Alikhanyan National Science Laboratory, including
key regulations and timelines.`,
    image: 'admission.webp',
    to: '/education/postgraduate-study/admission'
  },
  {
    key: 'application-form',
    title: 'Application form',
    body: `Details on the registration process, required forms,
and how to submit your application for postgraduate studies.`,
    image: 'application-form.webp',
    to: '/education/postgraduate-study/application-form'
  },
  {
    key: 'doctoral-studies',
    title: 'Doctoral studies',
    body: `Overview of doctoral programs, research areas and
regulatory framework for doctoral education at AANL.`,
    image: 'pexels.webp',
    to: '/education/postgraduate-study/doctoral-studies'
  },
  {
    key: 'third-cycle',
    title: 'Formation of Third-cycle studies',
    body: `Information on the development and organization of
third-cycle (PhD) educational programs and their structure.`,
    image: 'aplicant.webp',
    to: '/education/postgraduate-study/third-cycle-studies'
  }
]
