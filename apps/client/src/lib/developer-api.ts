'use server';

import { apiRequest } from '@/lib/api';
import { Language, Skill, Specialization } from '@/types/dev';

export async function getSkills(): Promise<Skill[]> {
  return apiRequest<Skill[]>({
    endpoint: '/users-jobs/skills',
    method: 'GET',
    revalidate: 3600,
  });
}

export async function getSpecializations(): Promise<Specialization[]> {
  return apiRequest<Specialization[]>({
    endpoint: '/users-jobs/specializations',
    method: 'GET',
    revalidate: 3600,
  });
}

export async function getLanguages(): Promise<Language[]> {
  return apiRequest<Language[]>({
    endpoint: '/users-jobs/languages',
    method: 'GET',
    revalidate: 3600,
  });
}
