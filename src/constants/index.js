export const COLORS = {
  offWhite: '#F8F6F2',
  white: '#FFFFFF',
  black: '#111111',
  gold: '#C9A86A',
  lightGray: '#F3F3F3',
  darkGray: '#666666',
  error: '#D32F2F',
  success: '#388E3C',
  warning: '#F57C00',
};

export const ROUTES = {
  HOME: '/',
  SHOP: '/shop',
  PRODUCT: '/product/:slug',
  CATEGORIES: '/categories',
  CART: '/cart',
  WISHLIST: '/wishlist',
  CHECKOUT: '/checkout',
  ORDER_SUCCESS: '/order-success',
  TRACK_ORDER: '/track-order',
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password/:token',
  PROFILE: '/profile',
  ORDERS: '/orders',
  ABOUT: '/about',
  CONTACT: '/contact',
  FAQ: '/faq',
  PRIVACY_POLICY: '/privacy-policy',
  TERMS_CONDITIONS: '/terms-conditions',
  NOT_FOUND: '/404',
};

export const API_ENDPOINTS = {
  AUTH: '/auth',
  PRODUCTS: '/products',
  CATEGORIES: '/categories',
  CART: '/cart',
  WISHLIST: '/wishlist',
  ORDERS: '/orders',
  COUPONS: '/coupons',
};

export const PRODUCT_VARIANTS = {
  SIZES: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  COLORS: [
    { name: 'Black', code: '#000000' },
    { name: 'White', code: '#FFFFFF' },
    { name: 'Gray', code: '#808080' },
    { name: 'Navy', code: '#000080' },
    { name: 'Red', code: '#FF0000' },
    { name: 'Blue', code: '#0000FF' },
    { name: 'Gold', code: '#FFD700' },
  ],
};

export const PAGINATION = {
  ITEMS_PER_PAGE: 12,
  ITEMS_PER_PAGE_SMALL: 10,
};

export const PAYMENT_METHODS = ['stripe', 'paypal', 'bank_transfer', 'cash_on_delivery'];

export const ORDER_STATUS = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];

export const TOAST_MESSAGES = {
  ADD_TO_CART_SUCCESS: 'Product added to cart',
  ADD_TO_WISHLIST_SUCCESS: 'Product added to wishlist',
  REMOVE_FROM_WISHLIST_SUCCESS: 'Product removed from wishlist',
  REMOVE_FROM_CART_SUCCESS: 'Product removed from cart',
  LOGIN_SUCCESS: 'Logged in successfully',
  LOGOUT_SUCCESS: 'Logged out successfully',
  PROFILE_UPDATE_SUCCESS: 'Profile updated successfully',
  ORDER_SUCCESS: 'Order placed successfully',
  ERROR: 'Something went wrong',
};
