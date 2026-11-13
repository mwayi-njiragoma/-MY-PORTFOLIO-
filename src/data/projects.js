const asset = (path) => `${import.meta.env.BASE_URL}${path}`

export const codingProjects = [
  {
    id: 'market-basket',
    title: 'Market Basket Analysis System',
    category: 'Data Science',
    description: 'A decision-support application for discovering product associations in retail transactions.',
    technologies: ['Python', 'Streamlit', 'Pandas'],
    image: asset('assets/projects/market-basket.png'),
    liveUrl: '',
    sourceUrl: '',
    featured: true,
  },
  {
    id: 'mlimipay',
    title: 'MlimiPay Web Experience',
    category: 'Web Development',
    description: 'A modern web experience focused on clear information, responsive layouts, and usability.',
    technologies: ['Next.js', 'React', 'Tailwind CSS'],
    image: asset('assets/projects/mlimipay.png'),
    liveUrl: '',
    sourceUrl: '',
    featured: true,
  },
  {
    id: 'me-tickets',
    title: 'Me-tickets Redemption App',
    category: 'Application',
    description: 'A React Native app built for Me-tickets that lets customers redeem their tickets quickly and easily.',
    technologies: ['React Native', 'Expo'],
    image: asset('assets/projects/Me-ticket.png'),
    liveUrl: '',
    sourceUrl: '',
    featured: false,
  },
]

export const designProjects = [
  {
    id: 'brand-identity',
    title: 'Brand Identity',
    category: 'Branding',
    description: 'A visual identity system built around clarity, consistency and a recognisable mark.',
    image: asset('assets/designs/brand-identity.png'),
  },
  {
    id: 'event-poster',
    title: 'Event Poster',
    category: 'Posters',
    description: 'A poster concept designed to communicate an event quickly and leave a lasting visual impression.',
    image: asset('assets/designs/event-poster.png'),
  },
  {
    id: 'social-graphics',
    title: 'Social Media Graphics',
    category: 'Social Media',
    description: 'A set of social media graphics designed to keep a brand consistent across digital platforms.',
    image: asset('assets/designs/social-graphics.png'),
  },
  {
    id: 'billboard',
    title: 'Billboard Concept',
    category: 'Advertising',
    description: 'An advertising layout designed for distance, impact and quick readability.',
    image: asset('assets/designs/billboard.png'),
  },
]