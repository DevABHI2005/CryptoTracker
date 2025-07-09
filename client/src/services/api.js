// ✅ client/src/services/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Attach token to every request automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const register = (formData) => API.post('/users/register', formData);
export const login = (formData) => API.post('/users/login', formData);
export const getProfile = () => API.get('/users/profile');
export const addFavorite = (coinId) => API.post('/users/favorite', { coinId });
export const removeFavorite = (coinId) => API.post('/users/remove-favorite', { coinId });
