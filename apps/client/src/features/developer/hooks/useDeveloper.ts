import { Developer, DeveloperFilters } from '../types/developer';

export function useFilteredDevelopers(developers: Developer[], filters: DeveloperFilters) {
  return developers.filter((dev) => {
    if (filters.specialization && dev.specialization.id !== filters.specialization) {
      return false;
    }
    if (filters.minExperience && dev.yearsOfExperience < filters.minExperience) {
      return false;
    }
    if (filters.maxSalary && dev.salaryPerHourExpected > filters.maxSalary) {
      return false;
    }
    if (filters.skills?.length) {
      const hasAllSkills = filters.skills.every((skillId) =>
        dev.skills.some((s) => s.id === skillId),
      );
      if (!hasAllSkills) return false;
    }
    if (filters.languages?.length) {
      const hasAllLanguages = filters.languages.every((langId) =>
        dev.spokenLanguages.some((l) => l.id === langId),
      );
      if (!hasAllLanguages) return false;
    }
    if (filters.location && !dev.location.toLowerCase().includes(filters.location.toLowerCase())) {
      return false;
    }
    return true;
  });
}
