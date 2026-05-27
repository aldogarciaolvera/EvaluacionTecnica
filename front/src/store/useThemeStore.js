import { create } from 'zustand';

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem('app_theme') || 'light',

  toggleTheme: () => set((state) => {
    const nextTheme = state.theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('app_theme', nextTheme);
    return { theme: nextTheme };
  }),

  setTheme: (newTheme) => {
    localStorage.setItem('app_theme', newTheme);
    set({ theme: newTheme });
  }
}));
