import type { User } from '@/@types/user';
import { create } from 'zustand';

type AuthStoreState = {
  user: User | null;
  isAuthenticated: boolean;

  setUser: (user: User | null) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthStoreState>((set) => ({
  user: null,
  isAuthenticated: false,

  setUser: (userData) => {
    set({
      user: userData,
      isAuthenticated: !!userData,
    });
  },
  logout: () => {
    set({ user: null, isAuthenticated: false });
  },
}));
