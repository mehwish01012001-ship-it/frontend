import api from './axiosInstance';

export const compareService = {
  getCompareItems: () => api.get('/compare'),
  addToCompare: (data) => api.post('/compare/add', data),
  removeFromCompare: (productId) => api.delete(`/compare/${productId}`),
};
