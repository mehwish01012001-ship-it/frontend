export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export const SERVER_URL =
  API_BASE_URL.replace(/\/api\/?$/i, '');

export const DEFAULT_PAGE_SIZE = 12;

export const SITE_NAME = 'RQ Fashion';

export const SITE_DESCRIPTION =
  'Luxury fashion store making elite style accessible.';

export const SOCIAL_LINKS = {
  facebook: 'https://facebook.com',
  instagram: 'https://instagram.com',
  twitter: 'https://twitter.com',
};