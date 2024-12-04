import { getLanguages, getSkills, getSpecializations } from '@/lib/developer-api';
import { Language, Skill, Specialization } from '@/types/dev';
import { create } from 'zustand';

interface FormDataStore {
  skills: Skill[];
  specializations: Specialization[];
  languages: Language[];
  isLoading: boolean;
  isLoaded: boolean;
  error: string | null;

  loadFormData: () => Promise<void>;
  reset: () => void;
}

export const useFormDataStore = create<FormDataStore>((set, get) => ({
  skills: [],
  specializations: [],
  languages: [],
  isLoading: false,
  isLoaded: false,
  error: null,

  loadFormData: async () => {
    if (get().isLoaded) return;

    set({ isLoading: true, error: null });

    try {
      const [skillsData, specializationsData, languagesData] = await Promise.all([
        getSkills(),
        getSpecializations(),
        getLanguages(),
      ]);

      set({
        skills: skillsData,
        specializations: specializationsData,
        languages: languagesData,
        isLoaded: true,
      });
    } catch (error) {
      set({ error: 'Failed to load form data' });
      console.error('Error loading form data:', error);
    } finally {
      set({ isLoading: false });
    }
  },

  reset: () =>
    set({
      skills: [],
      specializations: [],
      languages: [],
      isLoading: false,
      isLoaded: false,
      error: null,
    }),
}));
