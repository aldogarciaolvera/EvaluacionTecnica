import axios from 'axios';
import { useAuthStore } from '../store/useAuthStore';

const API_BASE_URL = import.meta.env.VITE_API_URL;

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      const normalizedToken = token.startsWith('Bearer ') ? token.slice(7) : token;

      const parseJwt = (t) => {
        try {
          const base64Url = t.split('.')[1];
          const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
          const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
          }).join(''));
          return JSON.parse(jsonPayload);
        } catch (e) {
          return null;
        }
      };

      const payload = parseJwt(normalizedToken);
      const now = Math.floor(Date.now() / 1000);
      if (payload && payload.exp && payload.exp < now) {
        // token expired: force logout
        try { useAuthStore.getState().logout(); } catch (e) { /* ignore */ }
        const err = new Error('Token expired');
        err.response = { status: 401 };
        return Promise.reject(err);
      }

      config.headers.Authorization = `Bearer ${normalizedToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// If server returns 401 (unauthorized) we force logout to clear expired token and redirect
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    try {
      if (error?.response?.status === 401) {
        useAuthStore.getState().logout();
      }
    } catch (e) { /* ignore */ }

    return Promise.reject(error);
  }
);

export default apiClient;
