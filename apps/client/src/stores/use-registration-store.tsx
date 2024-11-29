import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface RegistrationData {
  id?: string;
  role: 'developer' | 'recruiter';
  email?: string;
}

interface RegistrationStore {
  registrationData: RegistrationData | null;
  setRegistrationData: (data: RegistrationData) => void;
  clearRegistrationData: () => void;
  pendingBackendSync: boolean;
  setPendingBackendSync: (pending: boolean) => void;
}

export const useRegistrationStore = create<RegistrationStore>()(
  persist(
    (set) => ({
      registrationData: null,
      pendingBackendSync: false,
      setRegistrationData: (data) => set({ registrationData: data }),
      clearRegistrationData: () => set({ registrationData: null }),
      setPendingBackendSync: (pending) => set({ pendingBackendSync: pending }),
    }),
    {
      name: 'registration-storage',
    },
  ),
);
