// data/about-history.ts
export type HistoryItem = {
  year: number
  title: string
  body: string
  image: string // file name in assets/images/about/history/*
}

export const ABOUT_HISTORY: HistoryItem[] = [
  {
    year: 1943,
    title: 'A. I. Alikhanyan National Science Laboratory (AANL)',
    body: 'Yerevan Physics Institute (YerPhI) was founded in 1943 by eminent physicists Abraham and Artem Alikhanyan brothers. The study of cosmic rays and the setting-up of two cosmic ray stations on Mount Aragats ("Aragats" (3200m) and "Nor Amberd" (2000m)) laid the groundwork for foundation of the Institute',
    image: 'history-1943.webp'
  },
    {
    year: 1962,
    title: 'A. I. Alikhanyan National Science Laboratory (AANL)',
    body: 'In 1962, the Institute appeared under the authority of the State Atomic Energy Committee of the Soviet Union. After the collapse of the Soviet Union in 1992, Yerevan Physics Institute was taken under the auspices of the RA Ministry of Industry and Trade. And since 2002, it has been named after founder Artem Alikhanyan registered as "Yerevan Physics Institute named after Artem Alikhanyan" state non-commercial organization. On June 17, 2010, upon the decision of the RA Government, the Institute was renamed into "A. I. Alikhanyan National Science Laboratory", and in 2011, it developed into "A. I. ALIKHANYAN NATIONAL SCIENCE LABORATORY (YEREVAN PHYSICS INSTITUTE)" Foundation (for short-AANL)',
    image: 'history-1962.webp'
  },
    {
    year: 1970,
    title: 'A. I. Alikhanyan National Science Laboratory (AANL)',
    body: 'An important milestone in history of the Institute is the construction of 6 GeV electron synchrotron completed in 1967, and becoming the first particle accelerator in Armenia ("ARUS"). In 1970-91s, a number of scientific experiments were carried out at Yerevan electron accelerator, including the study of hadronic properties of photons in photon-induced reactions of π-mesons in nuclei, structure of nucleon resonances in polarized experiments, structure and properties of nuclear matter, important properties of transition and channeling radiation. It is noteworthy that in 1970 the experiment at electron accelerator revealed transition radiation in the X-ray region, something which is still widely used in modern scientific experiments for identification of particles.',
    image: 'history-1970.webp'
  },
    {
    year: 1980,
    title: 'A. I. Alikhanyan National Science Laboratory (AANL)',
    body: 'Due to these achievements, since 1985, scientists of the Institute have been actively participating in experiments within large international collaborations. One of the remarkable achievements of YerPhI was the creation of new detectors to register particles. Wide spark chambers and transition radiation detectors developed at the Institute are good examples of experimental technique development. Another noticeable example is the so-called Imaging Atmospheric Cherenkov Observatories (IACT) developed at YerPhI in the mid-1980s and used in ultra-high-energy gamma-ray astrophysics, which was successfully applied within the HEGRA international collaboration. This concept was further implemented in MAGIC and H.E.S.S. scientific experiments',
    image: 'history-1980.webp'
  },
    {
    year: 2002,
    title: 'A. I. Alikhanyan National Science Laboratory (AANL)',
    body: 'In recent years, AANL scientists actively participate in high-energy physics experiments abroad (KEK, JLab, DESY, CERN-LHC, MAX-lab, MAMI), studying structure of nucleons and mesons, electromagnetic form-factors of nucleons, quark-hadron duality, "short-range" nucleon-nucleon interactions, hadronization of quarks in the nuclear medium and vacuum, existence of physics beyond the Standard Model, physics of the Higgs boson, quark-gluon plasma, splitting of nuclei and hypernuclei, etc. AANL is also engaged with designing and building experimental equipment, software packaging for data acquisition and analysis used in modern scientific experiments. AANL proudly maintains its leading role as one of research organizations in the field of theoretical physics, successfully conducting internationally competitive research in the following areas: B-meson physics, QCD and related areas, neutrino physics, quantum field theory, string/M-theory, integrable models, statistical physics, astrophysics and cosmology, solid state physics and quantum information.',
    image: 'history-2002.webp'
  },
    {
    year: 2011,
    title: 'A. I. Alikhanyan National Science Laboratory (AANL)',
    body: 'In recent years, A.I. Alikhanyan National Science Laboratory (Yerevan Physics Institute) has significantly strengthened its position as a scientific leader with more than 30% of the country"s annual publications in scientific journals with highest impact factor. According to Thomson Reuters reports, AANL publications take 70% of citations made to entire scientific papers in Armenia',
    image: 'history-2011.webp'
  },
  // 1962, 1967, 1970, ...
]
