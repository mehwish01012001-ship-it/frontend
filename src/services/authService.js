import api from './axiosInstance';

export const authService = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  forgotPassword: (data) => api.post('/auth/forgot-password', data),
  resetPassword: (token, data) => api.post(`/auth/reset-password/${token}`, data),
  getProfile: () => api.get('/auth/me'),
  updateProfile: (data) => api.put('/auth/update-profile', data),
  updateAvatar: (data) => api.put('/auth/update-avatar', data),
  addAddress: (data) => api.post('/auth/add-address', data),
  updateAddress: (addressId, data) => api.put(`/auth/update-address/${addressId}`, data),
  deleteAddress: (addressId) => api.delete(`/auth/delete-address/${addressId}`),
};
