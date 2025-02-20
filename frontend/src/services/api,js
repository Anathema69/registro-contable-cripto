import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/', // Ajusta al puerto donde corre tu backend
});

// Interceptor para agregar token en cada request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});

export default API;
