// Application Routes
export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  PROJECTS: '/projects',
  ARTICLES: '/articles',
  CONTACT: '/contact',
  SOCIAL: '/social',
} as const;

// Navigation Menu
export const NAVIGATION = [
  { name: 'Home', href: ROUTES.HOME },
  { name: 'About', href: ROUTES.ABOUT },
  { name: 'Projects', href: ROUTES.PROJECTS },
  { name: 'Contact', href: ROUTES.CONTACT },
] as const;
