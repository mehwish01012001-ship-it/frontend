import api from './axiosInstance';

export const searchService = {
  searchProducts: (query) => api.get('/search', { params: { q: query } }),
  searchCategories: (query) => api.get('/categories/search', { params: { q: query } }),
};
