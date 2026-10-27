import { asset } from './asset'

export const COMPANY = {
  name: 'Black Tiger Security Solutions LLP',
  short: 'Black Tiger',
  tagline: 'Your Safety. Our Responsibility.',
  since: 2012,
  phone: '+91 78880 12309',
  phoneHref: 'tel:+917888012309',
  whatsapp: 'https://wa.me/917888012309',
  email: 'info@blacktigergoa.com',
  address: 'Office No. 3, 4th Floor, above Domino’s Pizza building, opposite Mapusa Police Station, Mapusa, Goa',
  mapQuery: 'Opposite Mapusa Police Station, Mapusa, Goa',
  facebook: 'https://www.facebook.com/blacktigergoa/',
  instagram: 'https://www.instagram.com/blacktigersecuritygoa/',
}

export const NAV = [
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'sectors', label: 'Sectors' },
  { id: 'approach', label: 'Approach' },
  { id: 'clients', label: 'Clients' },
  { id: 'careers', label: 'Careers' },
  { id: 'contact', label: 'Contact' },
]

export type Service = { slug: string; title: string; kicker: string; text: string; img: string; points: string[] }

export const SERVICES: Service[] = [
  {
    slug: 'guarding',
    title: 'Guarding Services',
    kicker: '24 / 7 Manned Security',
    text: 'Round-the-clock trained guards and supervisors protecting your people, property and premises — every shift, every gate.',
    img: asset('img/svc-guarding.jpg'),
    points: ['Security guards & supervisors', 'Access control & gate management', 'Night shift & static posts'],
  },
  {
    slug: 'electronic',
    title: 'Electronic Security Systems',
    kicker: 'CCTV · Alarms · Access',
    text: 'Design, installation and monitoring of CCTV, alarms and access control so nothing goes unseen at your home or business.',
    img: asset('img/svc-electronic.jpg'),
    points: ['CCTV surveillance & monitoring', 'Intrusion & fire alarms', 'Biometric access control'],
  },
  {
    slug: 'events',
    title: 'Event Security & Bouncers',
    kicker: 'Festivals · Clubs · Weddings',
    text: 'Male and female bouncers and crowd-control teams for Goa’s biggest festivals, clubs, concerts and private celebrations.',
    img: asset('img/svc-events.jpg'),
    points: ['Bouncer personnel (male / female)', 'Crowd & queue management', 'Special event duties'],
  },
  {
    slug: 'vip',
    title: 'VIP Protection & Escorts',
    kicker: 'Close Protection',
    text: 'Discreet personal security officers and escort teams for VIPs, celebrities, executives and high-value movements.',
    img: asset('img/svc-vip.jpg'),
    points: ['Personal security officers', 'Security escort services', 'Covert services'],
  },
  {
    slug: 'equipment',
    title: 'Security Products & Equipment',
    kicker: 'DFMD · HHMD Screening',
    text: 'Door-frame and hand-held metal detectors with trained operators for fast, thorough screening at entry points.',
    img: asset('img/svc-equipment.jpg'),
    points: ['DFMD — door frame metal detectors', 'HHMD — hand-held metal detectors', 'Baggage & entry screening'],
  },
  {
    slug: 'hotel',
    title: 'Hotel Security Detectives',
    kicker: 'Hospitality',
    text: 'Guest safety and asset protection for Goa’s hotels and resorts — courteous on the surface, vigilant underneath.',
    img: asset('img/svc-hotel.jpg'),
    points: ['Lobby & perimeter security', 'Guest safety & incident response', 'Loss prevention'],
  },
  {
    slug: 'retail',
    title: 'Retail Store Security',
    kicker: 'Loss Prevention',
    text: 'Uniformed and plain-clothes officers who deter theft, manage footfall and keep your showroom or store running smoothly.',
    img: asset('img/svc-retail.jpg'),
    points: ['Theft deterrence', 'Showroom & jewellery security', 'Footfall management'],
  },
  {
    slug: 'lady',
    title: 'Lady Guards',
    kicker: 'Women Security Officers',
    text: 'Professionally trained women officers for frisking, reception, hospitals, schools, events and women-centric spaces.',
    img: asset('img/svc-lady.jpg'),
    points: ['Female frisking & screening', 'Reception & front-desk security', 'Events & institutions'],
  },
  {
    slug: 'patrol',
    title: 'Mobile Patrols',
    kicker: 'Rapid Response',
    text: 'Marked patrol vehicles and response teams checking your sites at random intervals across North and South Goa.',
    img: asset('img/svc-patrol.jpg'),
    points: ['Scheduled & random patrols', 'Alarm response', 'Multi-site coverage'],
  },
  {
    slug: 'managers',
    title: 'Security Managers',
    kicker: 'Strategy & Supervision',
    text: 'Experienced managers who plan deployments, assess risk and supervise teams so your contract runs to standard.',
    img: asset('img/svc-managers.jpg'),
    points: ['Site security planning', 'Risk assessment', 'Team supervision & reporting'],
  },
  {
    slug: 'safety',
    title: 'Health, Safety & First Aid',
    kicker: 'Industrial Safety Officers',
    text: 'Industrial health & safety officers and certified first-aid staff keeping workplaces and construction sites compliant.',
    img: asset('img/svc-safety.jpg'),
    points: ['Industrial safety officers', 'Certified first aiders', 'Construction site safety'],
  },
  {
    slug: 'facility',
    title: 'Facility Management',
    kicker: 'Integrated Services',
    text: 'Maintenance and support services that keep your infrastructure clean, safe and running at its best.',
    img: asset('img/svc-facility.jpg'),
    points: ['Housekeeping & upkeep', 'Front-office support', 'Integrated FM contracts'],
  },
  {
    slug: 'training',
    title: 'Security Training',
    kicker: 'Security Management Training',
    text: 'Expert-led classroom and on-site training in security management, risk handling and emergency response.',
    img: asset('img/svc-training.jpg'),
    points: ['Guard & supervisor training', 'Fire & emergency drills', 'Client staff awareness'],
  },
]

export const SECTORS = [
  { title: 'Hotels & Resorts', icon: 'hotel' },
  { title: 'Religious Places', icon: 'temple' },
  { title: 'Industries', icon: 'factory' },
  { title: 'Corporate Offices', icon: 'office' },
  { title: 'Residential Complexes', icon: 'complex' },
  { title: 'VIP Movements', icon: 'vip' },
  { title: 'Events & Festivals', icon: 'event' },
  { title: 'Construction Sites', icon: 'construction' },
  { title: 'Retail & Jewellery', icon: 'retail' },
  { title: 'Time-Bound Deployments', icon: 'clock' },
] as const

export const STATS = [
  { value: 2012, label: 'Protecting Goa since', plain: true },
  { value: 280, suffix: '+', label: 'Trained full & part-time personnel' },
  { value: 360, suffix: '°', label: 'Security platform — people + technology' },
  { value: 24, suffix: '/7', label: 'Operations & rapid response' },
]

export const VALUES = [
  { title: 'Best People', text: 'Rigorously recruited, verified and trained officers who are proud to wear the shield.' },
  { title: 'Integrity', text: 'Honest reporting, transparent contracts and zero compromise on what we promise.' },
  { title: 'Experience', text: 'Over a decade securing Goa’s hotels, festivals, industries and VIPs.' },
  { title: 'Customers', text: 'Flexible, tailored solutions built around your site, your risks and your people.' },
  { title: 'Performance', text: 'Measured, reviewed and continuously improved — quantifiable risk reduction.' },
  { title: 'Teamwork', text: 'Strong local management backed by clear national direction and collaboration.' },
]

export const PROCESS = [
  { step: '01', title: 'Assess', text: 'We study your premises, operations and threats to understand exactly what needs protecting.' },
  { step: '02', title: 'Recruit & Train', text: 'Officers who meet our quality standards, with tailored on-site training on top of classroom courses.' },
  { step: '03', title: 'Deploy', text: 'Agreed assignment instructions, quality systems and supervisors in place from day one.' },
  { step: '04', title: 'Review & Improve', text: 'Regular reviews, measured effectiveness and continuous improvement — so you always know the value we bring.' },
]

export const CONSULTANCY = [
  'Risk analysis & site surveys',
  'Corporate & employee screening',
  'Supply chain security',
  'Compliance & security audits',
  'Investigations',
  'Security project management',
  'Business continuity planning',
]

export const CLIENTS = [
  'Red Bull',
  'Sunburn',
  'Bay 15',
  'C. Krishniah Chetty',
  'Socorro Gardens',
  'Risara',
  'Dolomite Infrastructure',
  'Goa Timeline',
  'Shobha Jewellers',
  'Nyex',
  'Geno Pharmaceuticals',
  'Naifer Constructions',
  'Drogaria Colvalcar',
  'Jacks Resort',
  'Purple Live',
  'Laa Amandosa',
]

export const JOBS = [
  {
    title: 'Security Guard',
    place: 'Mapusa & across Goa',
    type: 'Full-time / Part-time',
    reqs: ['Prior security experience preferred', 'Flexible working hours', 'Good communication skills', 'High school diploma or equivalent'],
  },
  {
    title: 'Security Officer / Supervisor',
    place: 'Mapusa & across Goa',
    type: 'Full-time',
    reqs: ['2+ years in security management', 'Knowledge of security protocols', 'Team leadership ability', 'Strong problem-solving skills'],
  },
  {
    title: 'Lady Guard / Bouncer',
    place: 'North & South Goa',
    type: 'Full-time / Event-based',
    reqs: ['Fit and confident', 'Event or hospitality experience a plus', 'Good communication skills', 'Willing to work night events'],
  },
]
