import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  isAuthenticated: !!localStorage.getItem('auth_token'),
  user: JSON.parse(localStorage.getItem('auth_user') || 'null'),
  token: localStorage.getItem('auth_token') || null,
  error: null,

  setAuth: (user, token) => {
    const normalizedToken = token?.startsWith('Bearer ') ? token.slice(7) : token;
    localStorage.setItem('auth_token', normalizedToken);
    localStorage.setItem('auth_user', JSON.stringify(user));
    set({
      isAuthenticated: true,
      user,
      token: normalizedToken,
      error: null,
    });
  },

  logout: () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
    set({
      isAuthenticated: false,
      user: null,
      token: null,
      error: null,
    });
  },

  setError: (error) => set({ error }),
}));
