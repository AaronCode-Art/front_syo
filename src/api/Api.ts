import axios from 'axios';

const api = axios.create({
  baseURL: 'https://backend-syo.onrender.com/api',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * INTERCEPTOR: Agrega automáticamente el token JWT a todas las peticiones
 */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * INTERCEPTOR: Maneja errores de autenticación (401)
 */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn('Token expirado o inválido. Cerrando sesión...');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
