

import axios from 'axios';
import { API_BASE_URL, SERVER_URL } from '../utils/constants';

export const getMediaUrl = (value) => {
  if (!value) {
    return "https://via.placeholder.com/600x700";
  }

  const raw = String(value).trim();

  if (!raw) {
    return "https://via.placeholder.com/600x700";
  }

  if (/^(https?:)?\/\//i.test(raw) || raw.startsWith("data:")) {
    return raw;
  }

  if (raw.startsWith("/uploads") || raw.startsWith("uploads/")) {
    return `${SERVER_URL}/${raw.replace(/^\/?/, "")}`;
  }

  if (raw.startsWith("/")) {
    return `${SERVER_URL}${raw}`;
  }

  return `${SERVER_URL}/${raw.replace(/^\/?/, "")}`;
};

export const getAbsoluteUrl = (value) => getMediaUrl(value);

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});


api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (config.data instanceof FormData) {
      delete config.headers['Content-Type'];
    }

    return config;
  },
  (error) => Promise.reject(error)
);


api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }

    return Promise.reject(error);
  }
);


export default api;