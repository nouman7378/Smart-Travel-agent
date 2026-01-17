// Navigation items configuration

export interface NavItem {
  name: string;
  href: string;
  icon?: string;
}

export const MAIN_NAV_ITEMS: NavItem[] = [
  { name: 'Flights', href: '/flights' },
  { name: 'Hotels', href: '/hotels' },
  { name: 'Cars', href: '/cars' },
  { name: 'Packages', href: '/packages' },
  { name: 'AI Chat', href: '/chat' },
  { name: 'Itinerary', href: '/itinerary/builder' },
  { name: 'Booking', href: '/booking/demo' },
  { name: 'Community', href: '/community' },
];

export const FOOTER_LINKS = {
  About: [
    { name: 'About Us', href: '/about' },
    { name: 'Jobs', href: '/jobs' },
    { name: 'List Your Property', href: '/list-property' },
    { name: 'Partnerships', href: '/partnerships' },
    { name: 'Advertising', href: '/advertising' },
    { name: 'Affiliate Marketing', href: '/affiliate' },
  ],
  Support: [
    { name: 'Support', href: '/support' },
    { name: 'FAQs', href: '/resources/faqs' },
    { name: 'Blog', href: '/resources/blog' },
  ],
  Policies: [
    { name: 'General Terms and Conditions', href: '/policies/terms' },
    { name: 'Privacy Policy', href: '/policies/privacy' },
    { name: 'Cookie Policy', href: '/policies/cookies' },
  ],
} as const;
