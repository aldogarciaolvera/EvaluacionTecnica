import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  isAuthenticated: !!localStorage.getItem('auth_token'),
  user: JSON.parse(localStorage.getItem('auth_user') || 'null'),
  token: localStorage.getItem('auth_token') || null,
  refreshToken: localStorage.getItem('auth_refresh') || null,
  error: null,

  setAuth: (user, token, refreshToken) => {
    const normalizedToken = token?.startsWith('Bearer ') ? token.slice(7) : token;
    const normalizedRefresh = refreshToken?.startsWith('Bearer ') ? refreshToken.slice(7) : refreshToken;

    if (normalizedToken) {
      localStorage.setItem('auth_token', normalizedToken);
    }

    if (normalizedRefresh) {
      localStorage.setItem('auth_refresh', normalizedRefresh);
    }

    if (user) {
      localStorage.setItem('auth_user', JSON.stringify(user));
    }

    set({
      isAuthenticated: !!normalizedToken,
      user,
      token: normalizedToken,
      refreshToken: normalizedRefresh,
      error: null,
    });
  },

  logout: () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
    localStorage.removeItem('auth_refresh');
    set({
      isAuthenticated: false,
      user: null,
      token: null,
      refreshToken: null,
      error: null,
    });
  },

  setError: (error) => set({ error }),
}));
