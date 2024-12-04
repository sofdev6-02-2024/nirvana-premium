import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '../types/user';

interface UserStore {
  user: User | null;
  identityId: string | null;
  token: string | null;
  isCreated: boolean;

  setUser: (user: User) => void;
  setIdentityId: (id: string) => void;
  setToken: (token: string) => void;
  setIsCreated: (created: boolean) => void;
  clearStore: () => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      identityId: null,
      token: null,
      isCreated: false,

      setUser: (user) => set({ user }),
      setIdentityId: (id) => set({ identityId: id }),
      setToken: (token) => set({ token }),
      setIsCreated: (created) => set({ isCreated: created }),
      clearStore: () =>
        set({
          user: null,
          identityId: null,
          token: null,
          isCreated: false,
        }),
    }),
    {
      name: 'user-storage',
    },
  ),
);
