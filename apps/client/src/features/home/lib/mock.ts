import { addDays, subDays } from 'date-fns';
import { Application, ApplicationsResponse, ApplicationStats } from '../types/home';

const mockApplications: Application[] = [
  {
    id: '1',
    status: 'Published',
    jobId: 'job-1',
    jobTitle: 'Senior React Developer',
    recruiterId: 'rec-1',
    recruiterName: 'Tech Corp',
    recruiterProfileUrl:
      'https://res.cloudinary.com/dyql1kk99/image/upload/v1732259321/gyi8p4p4ufdwzblyxooa.png',
    createdAt: subDays(new Date(), 2).toISOString(),
    updatedAt: subDays(new Date(), 1).toISOString(),
  },
  {
    id: '2',
    status: 'Viewed',
    jobId: 'job-2',
    jobTitle: 'Frontend Team Lead',
    recruiterId: 'rec-2',
    recruiterName: 'Innovation Labs',
    recruiterProfileUrl:
      'https://res.cloudinary.com/dyql1kk99/image/upload/v1732259321/gyi8p4p4ufdwzblyxooa.png',
    createdAt: subDays(new Date(), 5).toISOString(),
    updatedAt: subDays(new Date(), 3).toISOString(),
  },
  {
    id: '3',
    status: 'Accepted',
    jobId: 'job-3',
    jobTitle: 'Full Stack Developer',
    recruiterId: 'rec-3',
    recruiterName: 'Digital Solutions',
    recruiterProfileUrl:
      'https://res.cloudinary.com/dyql1kk99/image/upload/v1732259321/gyi8p4p4ufdwzblyxooa.png',
    createdAt: subDays(new Date(), 10).toISOString(),
    updatedAt: addDays(new Date(), 1).toISOString(),
  },
  {
    id: '4',
    status: 'Rejected',
    jobId: 'job-4',
    jobTitle: 'TypeScript Developer',
    recruiterId: 'rec-4',
    recruiterName: 'Software Inc',
    recruiterProfileUrl:
      'https://res.cloudinary.com/dyql1kk99/image/upload/v1732259321/gyi8p4p4ufdwzblyxooa.png',
    createdAt: subDays(new Date(), 15).toISOString(),
    updatedAt: subDays(new Date(), 13).toISOString(),
  },
];

const mockStats: ApplicationStats = {
  total: 45,
  pending: 20,
  accepted: 15,
  rejected: 8,
  viewed: 2,
};

export const applicationsService = {
  getApplications: async (
    developerId: string,
    page: number = 1,
    pageSize: number = 10,
  ): Promise<ApplicationsResponse> => {
    await new Promise((resolve) => setTimeout(resolve, 800));

    const start = (page - 1) * pageSize;
    const paginatedItems = mockApplications.slice(start, start + pageSize);

    return {
      items: paginatedItems,
      page,
      pageSize,
      totalCount: mockApplications.length,
      hasNextPage: start + pageSize < mockApplications.length,
      hasPreviousPage: page > 1,
    };
  },

  getStats: async (developerId: string): Promise<ApplicationStats> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockStats;
  },
};
