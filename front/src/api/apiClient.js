import axios from 'axios';
import { useAuthStore } from '../store/useAuthStore';
import { resetIdleTimer } from '../utils/idle';

const API_BASE_URL = import.meta.env.VITE_API_URL;
let refreshPromise = null;

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

const parseJwt = (token) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
};

const refreshAccessToken = async () => {
  if (refreshPromise) {
    return refreshPromise;
  }

  const refreshToken = localStorage.getItem('auth_refresh');
  if (!refreshToken) {
    useAuthStore.getState().logout();
    throw new Error('No refresh token available');
  }

  refreshPromise = axios.post(
    `${API_BASE_URL}/api/login/refresh`,
    { refresh_token: refreshToken },
    { headers: { 'Content-Type': 'application/json' } }
  )
    .then((response) => {
      const newToken = response.data?.access_token;
      if (!newToken) {
        throw new Error('No access token returned');
      }
      const currentUser = useAuthStore.getState().user;
      useAuthStore.getState().setAuth(currentUser, newToken, refreshToken);
      return newToken;
    })
    .catch((error) => {
      useAuthStore.getState().logout();
      throw error;
    })
    .finally(() => {
      refreshPromise = null;
    });

  return refreshPromise;
};

apiClient.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      let normalizedToken = token.startsWith('Bearer ') ? token.slice(7) : token;
      const payload = parseJwt(normalizedToken);
      const now = Math.floor(Date.now() / 1000);

      if (payload && payload.exp) {
        if (payload.exp < now) {
          normalizedToken = await refreshAccessToken();
        } else if (payload.exp < now + 120) {
          normalizedToken = await refreshAccessToken();
        }
      }

      try {
        resetIdleTimer();
      } catch (e) {
        /* ignore */
      }

      config.headers.Authorization = `Bearer ${normalizedToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error?.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry &&
      !originalRequest.url?.includes('/refresh')
    ) {
      originalRequest._retry = true;
      try {
        const newToken = await refreshAccessToken();
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    if (error?.response?.status === 401) {
      useAuthStore.getState().logout();
    }

    return Promise.reject(error);
  }
);

export default apiClient;
