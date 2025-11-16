// data/division-employees.ts
export type Employee = {
  id: string
  divisionSlug: string
  name: string
  photo: string        
  role?: string
  credentials?: string
  scholar?: string
  linkedin?: string
  facebook?: string
  email?: string
}

/**
 * Replace this in the future with your CMS call.
 * Photos can live in /public/images/employees/*  or remote URLs.
 */
const EMPLOYEES: Employee[] = [
  {
    id: 'hayotsyan',
    divisionSlug: 'quantum-technologies',
    name: 'Sargis Hayotsyan',
    photo: 'sargis.webp',
    role: 'Chairman of the board of trustees; chairman of the RA MESCS Higher Education and Science Committee',
    credentials: 'Candidate of Chemical Sciences',
    scholar: '#',
    linkedin: '#',
    facebook: '#',
    email: 's.hayotsyan@aanl.am'
  },
  {
    id: 'mkrtchyan',
    divisionSlug: 'quantum-technologies',
    name: 'Ruben Mkrtchyan',
    photo: 'ruben.webp',
    role: 'AANL leading scientist',
    credentials: 'Doctor of Sciences in Physics and Mathematics',
    scholar: '#',
    linkedin: '#',
    facebook: '#',
    email: 's.mkrtchyan@aanl.am'
  },
  {
    id: 'nerkaryan',
    divisionSlug: 'quantum-technologies',
    name: 'Khachatur Nerkaryan',
    photo: 'khachatur.webp',
    role: 'Director of “A. I. Alikhanyan National Science Laboratory” Institute of Physics',
    credentials: 'Doctor of Physical and Mathematical Sciences, professor',
    scholar: '#',
    linkedin: '#',
    facebook: '#',
    email: 's.mkrtchyan@aanl.am'
  },
  {
    id: 'karabekyan',
    divisionSlug: 'quantum-technologies',
    name: 'Samvel Karabekyan',
    photo: 'samvel.webp',
    role: 'Director of “A. I. Alikhanyan National Science Laboratory” Institute of Physics',
    credentials: 'Doctor of Physical and Mathematical Sciences, professor',
    scholar: '#',
    linkedin: '#',
    facebook: '#',
    email: 's.mkrtchyan@aanl.am'
  },
  {
    id: 'hayotsyan',
    divisionSlug: 'quantum-technologies',
    name: 'Sargis Hayotsyan',
    photo: 'sargis.webp',
    role: 'Chairman of the board of trustees; chairman of the RA MESCS Higher Education and Science Committee',
    credentials: 'Candidate of Chemical Sciences',
    scholar: '#',
    linkedin: '#',
    facebook: '#',
    email: 's.mkrtchyan@aanl.am'
  },
  {
    id: 'mkrtchyan',
    divisionSlug: 'quantum-technologies',
    name: 'Ruben Mkrtchyan',
    photo: 'ruben.webp',
    role: 'AANL leading scientist',
    credentials: 'Doctor of Sciences in Physics and Mathematics',
    scholar: '#',
    linkedin: '#',
    facebook: '#',
    email: 's.mkrtchyan@aanl.am'
  },
  {
    id: 'nerkaryan',
    divisionSlug: 'theoretical-physics',
    name: 'Khachatur Nerkaryan',
    photo: 'khachatur.webp',
    role: 'Director of “A. I. Alikhanyan National Science Laboratory” Institute of Physics',
    credentials: 'Doctor of Physical and Mathematical Sciences, professor',
    scholar: '#',
    facebook: '#',
    email: 's.hayotsyan@aanl.am'
  },
  {
    id: 'karabekyan',
    divisionSlug: 'theoretical-physics',
    name: 'Samvel Karabekyan',
    photo: 'samvel.webp',
    role: 'Director of “A. I. Alikhanyan National Science Laboratory” Institute of Physics',
    credentials: 'Doctor of Physical and Mathematical Sciences, professor',
    scholar: '#',
    linkedin: '#',
    facebook: '#',
    email: 's.hayotsyan@aanl.am'
  },
    {
    id: 'hayotsyan',
    divisionSlug: 'theoretical-physics',
    name: 'Sargis Hayotsyan',
    photo: 'sargis.webp',
    role: 'Chairman of the board of trustees; chairman of the RA MESCS Higher Education and Science Committee',
    credentials: 'Candidate of Chemical Sciences',
    scholar: '#',
    linkedin: '#',
    facebook: '#',
    email: 's.hayotsyan@aanl.am'
  },
  {
    id: 'mkrtchyan',
    divisionSlug: 'theoretical-physics',
    name: 'Ruben Mkrtchyan',
    photo: 'ruben.webp',
    role: 'AANL leading scientist',
    credentials: 'Doctor of Sciences in Physics and Mathematics',
    scholar: '#',
    linkedin: '#',
    facebook: '#',
    email: 's.hayotsyan@aanl.am'
  },
  {
    id: 'nerkaryan',
    divisionSlug: 'theoretical-physics',
    name: 'Khachatur Nerkaryan',
    photo: 'khachatur.webp',
    role: 'Director of “A. I. Alikhanyan National Science Laboratory” Institute of Physics',
    credentials: 'Doctor of Physical and Mathematical Sciences, professor',
    scholar: '#',
    linkedin: '#',
    facebook: '#',
    email: 's.hayotsyan@aanl.am'
  },
  {
    id: 'karabekyan',
    divisionSlug: 'theoretical-physics',
    name: 'Samvel Karabekyan',
    photo: 'samvel.webp',
    role: 'Director of “A. I. Alikhanyan National Science Laboratory” Institute of Physics',
    credentials: 'Doctor of Physical and Mathematical Sciences, professor',
    scholar: '#',
    linkedin: '#',
    facebook: '#',
    email: 's.hayotsyan@aanl.am'
  },
    {
    id: 'hayotsyan',
    divisionSlug: 'theoretical-physics',
    name: 'Sargis Hayotsyan',
    photo: 'sargis.webp',
    role: 'Chairman of the board of trustees; chairman of the RA MESCS Higher Education and Science Committee',
    credentials: 'Candidate of Chemical Sciences',
    scholar: '#',
    linkedin: '#',
    facebook: '#',
    email: 's.hayotsyan@aanl.am'
  },
  {
    id: 'mkrtchyan',
    divisionSlug: 'cosmology-astrophysics',
    name: 'Ruben Mkrtchyan',
    photo: 'ruben.webp',
    role: 'AANL leading scientist',
    credentials: 'Doctor of Sciences in Physics and Mathematics',
    scholar: '#',
    linkedin: '#',
    facebook: '#',
    email: 's.hayotsyan@aanl.am'
  },
  {
    id: 'nerkaryan',
    divisionSlug: 'cosmology-astrophysics',
    name: 'Khachatur Nerkaryan',
    photo: 'khachatur.webp',
    role: 'Director of “A. I. Alikhanyan National Science Laboratory” Institute of Physics',
    credentials: 'Doctor of Physical and Mathematical Sciences, professor',
    scholar: '#',
    linkedin: '#',
    facebook: '#',
    email: 's.hayotsyan@aanl.am'
  },
  {
    id: 'karabekyan',
    divisionSlug: 'cosmology-astrophysics',
    name: 'Samvel Karabekyan',
    photo: 'samvel.webp',
    role: 'Director of “A. I. Alikhanyan National Science Laboratory” Institute of Physics',
    credentials: 'Doctor of Physical and Mathematical Sciences, professor',
    scholar: '#',
    linkedin: '#',
    facebook: '#',
    email: 's.hayotsyan@aanl.am'
  },
   {
    id: 'nerkaryan',
    divisionSlug: 'isotopes-production',
    name: 'Khachatur Nerkaryan',
    photo: 'khachatur.webp',
    role: 'Director of “A. I. Alikhanyan National Science Laboratory” Institute of Physics',
    credentials: 'Doctor of Physical and Mathematical Sciences, professor',
    scholar: '#',
    linkedin: '#',
    facebook: '#',
    email: 's.hayotsyan@aanl.am'
  },
  {
    id: 'karabekyan',
    divisionSlug: 'isotopes-production',
    name: 'Samvel Karabekyan',
    photo: 'samvel.webp',
    role: 'Director of “A. I. Alikhanyan National Science Laboratory” Institute of Physics',
    credentials: 'Doctor of Physical and Mathematical Sciences, professor',
    scholar: '#',
    linkedin: '#',
    facebook: '#',
    email: 's.hayotsyan@aanl.am'
  },
    {
    id: 'hayotsyan',
    divisionSlug: 'isotopes-production',
    name: 'Sargis Hayotsyan',
    photo: 'sargis.webp',
    role: 'Chairman of the board of trustees; chairman of the RA MESCS Higher Education and Science Committee',
    credentials: 'Candidate of Chemical Sciences',
    scholar: '#',
    linkedin: '#',
    facebook: '#',
    email: 's.hayotsyan@aanl.am'
  },
  {
    id: 'mkrtchyan',
    divisionSlug: 'isotopes-production',
    name: 'Ruben Mkrtchyan',
    photo: 'ruben.webp',
    role: 'AANL leading scientist',
    credentials: 'Doctor of Sciences in Physics and Mathematics',
    scholar: '#',
    linkedin: '#',
    facebook: '#',
    email: 's.hayotsyan@aanl.am'
  },
  {
    id: 'nerkaryan',
    divisionSlug: 'isotopes-production',
    name: 'Khachatur Nerkaryan',
    photo: 'khachatur.webp',
    role: 'Director of “A. I. Alikhanyan National Science Laboratory” Institute of Physics',
    credentials: 'Doctor of Physical and Mathematical Sciences, professor',
    scholar: '#',
    linkedin: '#',
    facebook: '#',
    email: 's.hayotsyan@aanl.am'
  },
  {
    id: 'karabekyan',
    divisionSlug: 'isotopes-production',
    name: 'Samvel Karabekyan',
    photo: 'samvel.webp',
    role: 'Director of “A. I. Alikhanyan National Science Laboratory” Institute of Physics',
    credentials: 'Doctor of Physical and Mathematical Sciences, professor',
    scholar: '#',
    linkedin: '#',
    facebook: '#',
    email: 's.hayotsyan@aanl.am'
  },
    {
    id: 'hayotsyan',
    divisionSlug: 'isotopes-production',
    name: 'Sargis Hayotsyan',
    photo: 'sargis.webp',
    role: 'Chairman of the board of trustees; chairman of the RA MESCS Higher Education and Science Committee',
    credentials: 'Candidate of Chemical Sciences',
    scholar: '#',
    linkedin: '#',
    facebook: '#',
    email: 's.hayotsyan@aanl.am'
  },
   {
    id: 'nerkaryan',
    divisionSlug: 'computational-physics-it',
    name: 'Khachatur Nerkaryan',
    photo: 'khachatur.webp',
    role: 'Director of “A. I. Alikhanyan National Science Laboratory” Institute of Physics',
    credentials: 'Doctor of Physical and Mathematical Sciences, professor',
    scholar: '#',
    linkedin: '#',
    facebook: '#',
    email: 's.hayotsyan@aanl.am'
  },
  {
    id: 'karabekyan',
    divisionSlug: 'computational-physics-it',
    name: 'Samvel Karabekyan',
    photo: 'samvel.webp',
    role: 'Director of “A. I. Alikhanyan National Science Laboratory” Institute of Physics',
    credentials: 'Doctor of Physical and Mathematical Sciences, professor',
    scholar: '#',
    linkedin: '#',
    facebook: '#',
    email: 's.hayotsyan@aanl.am'
  },
    {
    id: 'hayotsyan',
    divisionSlug: 'computational-physics-it',
    name: 'Sargis Hayotsyan',
    photo: 'sargis.webp',
    role: 'Chairman of the board of trustees; chairman of the RA MESCS Higher Education and Science Committee',
    credentials: 'Candidate of Chemical Sciences',
    scholar: '#',
    linkedin: '#',
    facebook: '#',
    email: 's.hayotsyan@aanl.am'
  },
  {
    id: 'mkrtchyan',
    divisionSlug: 'computational-physics-it',
    name: 'Ruben Mkrtchyan',
    photo: 'ruben.webp',
    role: 'AANL leading scientist',
    credentials: 'Doctor of Sciences in Physics and Mathematics',
    scholar: '#',
    linkedin: '#',
    facebook: '#',
    email: 's.hayotsyan@aanl.am'
  },
  {
    id: 'nerkaryan',
    divisionSlug: 'computational-physics-it',
    name: 'Khachatur Nerkaryan',
    photo: 'khachatur.webp',
    role: 'Director of “A. I. Alikhanyan National Science Laboratory” Institute of Physics',
    credentials: 'Doctor of Physical and Mathematical Sciences, professor',
    scholar: '#',
    linkedin: '#',
    facebook: '#',
    email: 's.hayotsyan@aanl.am'
  },
  {
    id: 'karabekyan',
    divisionSlug: 'computational-physics-it',
    name: 'Samvel Karabekyan',
    photo: 'samvel.webp',
    role: 'Director of “A. I. Alikhanyan National Science Laboratory” Institute of Physics',
    credentials: 'Doctor of Physical and Mathematical Sciences, professor',
    scholar: '#',
    linkedin: '#',
    facebook: '#',
    email: 's.hayotsyan@aanl.am'
  },
    {
    id: 'hayotsyan',
    divisionSlug: 'computational-physics-it',
    name: 'Sargis Hayotsyan',
    photo: 'sargis.webp',
    role: 'Chairman of the board of trustees; chairman of the RA MESCS Higher Education and Science Committee',
    credentials: 'Candidate of Chemical Sciences',
    scholar: '#',
    linkedin: '#',
    facebook: '#',
    email: 's.hayotsyan@aanl.am'
  },
  {
    id: 'nerkaryan',
    divisionSlug: 'experimental-physics',
    name: 'Khachatur Nerkaryan',
    photo: 'khachatur.webp',
    role: 'Director of “A. I. Alikhanyan National Science Laboratory” Institute of Physics',
    credentials: 'Doctor of Physical and Mathematical Sciences, professor',
    scholar: '#',
    linkedin: '#',
    facebook: '#',
    email: 's.hayotsyan@aanl.am'
  },
  {
    id: 'karabekyan',
    divisionSlug: 'experimental-physics',
    name: 'Samvel Karabekyan',
    photo: 'samvel.webp',
    role: 'Director of “A. I. Alikhanyan National Science Laboratory” Institute of Physics',
    credentials: 'Doctor of Physical and Mathematical Sciences, professor',
    scholar: '#',
    linkedin: '#',
    facebook: '#',
    email: 's.hayotsyan@aanl.am'
  },
    {
    id: 'hayotsyan',
    divisionSlug: 'experimental-physics',
    name: 'Sargis Hayotsyan',
    photo: 'sargis.webp',
    role: 'Chairman of the board of trustees; chairman of the RA MESCS Higher Education and Science Committee',
    credentials: 'Candidate of Chemical Sciences',
    scholar: '#',
    linkedin: '#',
    facebook: '#',
    email: 's.hayotsyan@aanl.am'
  },
  {
    id: 'mkrtchyan',
    divisionSlug: 'experimental-physics',
    name: 'Ruben Mkrtchyan',
    photo: 'ruben.webp',
    role: 'AANL leading scientist',
    credentials: 'Doctor of Sciences in Physics and Mathematics',
    scholar: '#',
    linkedin: '#',
    facebook: '#',
    email: 's.hayotsyan@aanl.am'
  },
  {
    id: 'nerkaryan',
    divisionSlug: 'experimental-physics',
    name: 'Khachatur Nerkaryan',
    photo: 'khachatur.webp',
    role: 'Director of “A. I. Alikhanyan National Science Laboratory” Institute of Physics',
    credentials: 'Doctor of Physical and Mathematical Sciences, professor',
    scholar: '#',
    linkedin: '#',
    facebook: '#',
    email: 's.hayotsyan@aanl.am'
  },
  {
    id: 'karabekyan',
    divisionSlug: 'experimental-physics',
    name: 'Samvel Karabekyan',
    photo: 'samvel.webp',
    role: 'Director of “A. I. Alikhanyan National Science Laboratory” Institute of Physics',
    credentials: 'Doctor of Physical and Mathematical Sciences, professor',
    scholar: '#',
    linkedin: '#',
    facebook: '#',
    email: 's.hayotsyan@aanl.am'
  },
    {
    id: 'hayotsyan',
    divisionSlug: 'experimental-physics',
    name: 'Sargis Hayotsyan',
    photo: 'sargis.webp',
    role: 'Chairman of the board of trustees; chairman of the RA MESCS Higher Education and Science Committee',
    credentials: 'Candidate of Chemical Sciences',
    scholar: '#',
    linkedin: '#',
    facebook: '#',
    email: 's.hayotsyan@aanl.am'
  },
    {
    id: 'nerkaryan',
    divisionSlug: 'cosmic-rays',
    name: 'Khachatur Nerkaryan',
    photo: 'khachatur.webp',
    role: 'Director of “A. I. Alikhanyan National Science Laboratory” Institute of Physics',
    credentials: 'Doctor of Physical and Mathematical Sciences, professor',
    scholar: '#',
    linkedin: '#',
    facebook: '#',
    email: 's.hayotsyan@aanl.am'
  },
  {
    id: 'karabekyan',
    divisionSlug: 'cosmic-rays',
    name: 'Samvel Karabekyan',
    photo: 'samvel.webp',
    role: 'Director of “A. I. Alikhanyan National Science Laboratory” Institute of Physics',
    credentials: 'Doctor of Physical and Mathematical Sciences, professor',
    scholar: '#',
    linkedin: '#',
    facebook: '#',
    email: 's.hayotsyan@aanl.am'
  },
    {
    id: 'hayotsyan',
    divisionSlug: 'cosmic-rays',
    name: 'Sargis Hayotsyan',
    photo: 'sargis.webp',
    role: 'Chairman of the board of trustees; chairman of the RA MESCS Higher Education and Science Committee',
    credentials: 'Candidate of Chemical Sciences',
    scholar: '#',
    linkedin: '#',
    facebook: '#',
    email: 's.hayotsyan@aanl.am'
  },
  {
    id: 'mkrtchyan',
    divisionSlug: 'cosmic-rays',
    name: 'Ruben Mkrtchyan',
    photo: 'ruben.webp',
    role: 'AANL leading scientist',
    credentials: 'Doctor of Sciences in Physics and Mathematics',
    scholar: '#',
    linkedin: '#',
    facebook: '#',
    email: 's.hayotsyan@aanl.am'
  },
  {
    id: 'nerkaryan',
    divisionSlug: 'cosmic-rays',
    name: 'Khachatur Nerkaryan',
    photo: 'khachatur.webp',
    role: 'Director of “A. I. Alikhanyan National Science Laboratory” Institute of Physics',
    credentials: 'Doctor of Physical and Mathematical Sciences, professor',
    scholar: '#',
    linkedin: '#',
    facebook: '#',
    email: 's.hayotsyan@aanl.am'
  },
  {
    id: 'karabekyan',
    divisionSlug: 'cosmic-rays',
    name: 'Samvel Karabekyan',
    photo: 'samvel.webp',
    role: 'Director of “A. I. Alikhanyan National Science Laboratory” Institute of Physics',
    credentials: 'Doctor of Physical and Mathematical Sciences, professor',
    scholar: '#',
    linkedin: '#',
    facebook: '#',
    email: 's.hayotsyan@aanl.am'
  },
    {
    id: 'hayotsyan',
    divisionSlug: 'cosmic-rays',
    name: 'Sargis Hayotsyan',
    photo: 'sargis.webp',
    role: 'Chairman of the board of trustees; chairman of the RA MESCS Higher Education and Science Committee',
    credentials: 'Candidate of Chemical Sciences',
    scholar: '#',
    linkedin: '#',
    facebook: '#',
    email: 's.hayotsyan@aanl.am'
  },
      {
    id: 'nerkaryan',
    divisionSlug: 'applied-physics',
    name: 'Khachatur Nerkaryan',
    photo: 'khachatur.webp',
    role: 'Director of “A. I. Alikhanyan National Science Laboratory” Institute of Physics',
    credentials: 'Doctor of Physical and Mathematical Sciences, professor',
    scholar: '#',
    linkedin: '#',
    facebook: '#',
    email: 's.hayotsyan@aanl.am'
  },
  {
    id: 'karabekyan',
    divisionSlug: 'applied-physics',
    name: 'Samvel Karabekyan',
    photo: 'samvel.webp',
    role: 'Director of “A. I. Alikhanyan National Science Laboratory” Institute of Physics',
    credentials: 'Doctor of Physical and Mathematical Sciences, professor',
    scholar: '#',
    linkedin: '#',
    facebook: '#',
    email: 's.hayotsyan@aanl.am'
  },
    {
    id: 'hayotsyan',
    divisionSlug: 'applied-physics',
    name: 'Sargis Hayotsyan',
    photo: 'sargis.webp',
    role: 'Chairman of the board of trustees; chairman of the RA MESCS Higher Education and Science Committee',
    credentials: 'Candidate of Chemical Sciences',
    scholar: '#',
    linkedin: '#',
    facebook: '#',
    email: 's.hayotsyan@aanl.am'
  },
  {
    id: 'mkrtchyan',
    divisionSlug: 'applied-physics',
    name: 'Ruben Mkrtchyan',
    photo: 'ruben.webp',
    role: 'AANL leading scientist',
    credentials: 'Doctor of Sciences in Physics and Mathematics',
    scholar: '#',
    linkedin: '#',
    facebook: '#',
    email: 's.hayotsyan@aanl.am'
  },
  {
    id: 'nerkaryan',
    divisionSlug: 'applied-physics',
    name: 'Khachatur Nerkaryan',
    photo: 'khachatur.webp',
    role: 'Director of “A. I. Alikhanyan National Science Laboratory” Institute of Physics',
    credentials: 'Doctor of Physical and Mathematical Sciences, professor',
    scholar: '#',
    linkedin: '#',
    facebook: '#',
    email: 's.hayotsyan@aanl.am'
  },
  {
    id: 'karabekyan',
    divisionSlug: 'applied-physics',
    name: 'Samvel Karabekyan',
    photo: 'samvel.webp',
    role: 'Director of “A. I. Alikhanyan National Science Laboratory” Institute of Physics',
    credentials: 'Doctor of Physical and Mathematical Sciences, professor',
    scholar: '#',
    linkedin: '#',
    facebook: '#',
    email: 's.hayotsyan@aanl.am'
  },
    {
    id: 'hayotsyan',
    divisionSlug: 'applied-physics',
    name: 'Sargis Hayotsyan',
    photo: 'sargis.webp',
    role: 'Chairman of the board of trustees; chairman of the RA MESCS Higher Education and Science Committee',
    credentials: 'Candidate of Chemical Sciences',
    scholar: '#',
    linkedin: '#',
    facebook: '#',
    email: 's.hayotsyan@aanl.am'
  },
]

export function getDivisionEmployees(slug: string): Employee[] {
  if (!slug) return []
  return EMPLOYEES.filter(e => e.divisionSlug === slug)
}
