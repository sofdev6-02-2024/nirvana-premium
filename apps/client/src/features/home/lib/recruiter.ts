import { subDays } from 'date-fns';
import { ApplicantsResponse, ApplicantsStats, RecruiterJob } from '../types/recruiter';

const mockJobs: RecruiterJob[] = [
  {
    id: '1',
    title: 'Senior React Developer',
    salaryPerHour: 75.0,
    schedule: 'Full Time',
    modality: 'Remote',
    status: 'Open',
    description: 'Looking for a senior React developer...',
    location: 'New York, US',
    recruiterId: 'rec-1',
    recruiterLogo: '/api/placeholder/48/48',
    createdAt: subDays(new Date(), 5).toISOString(),
    updatedAt: subDays(new Date(), 5).toISOString(),
  },
  {
    id: '2',
    title: 'Full Stack Engineer',
    salaryPerHour: 65.0,
    schedule: 'Full Time',
    modality: 'Hybrid',
    status: 'In Progress',
    description: 'Experienced full stack developer needed...',
    location: 'San Francisco, US',
    recruiterId: 'rec-1',
    recruiterLogo: '/api/placeholder/48/48',
    createdAt: subDays(new Date(), 3).toISOString(),
    updatedAt: subDays(new Date(), 1).toISOString(),
  },
];

const mockApplicants = {
  '1': {
    jobId: '1',
    jobTitle: 'Senior React Developer',
    developers: {
      items: [
        {
          developerId: 'dev-1',
          developerProfileUrl: '/api/placeholder/48/48',
          developerName: 'John',
          developerLastName: 'Doe',
          status: 'Published',
          createdAt: subDays(new Date(), 2).toISOString(),
          updatedAt: subDays(new Date(), 2).toISOString(),
        },
        {
          developerId: 'dev-2',
          developerProfileUrl: '/api/placeholder/48/48',
          developerName: 'Jane',
          developerLastName: 'Smith',
          status: 'Accepted',
          createdAt: subDays(new Date(), 4).toISOString(),
          updatedAt: subDays(new Date(), 1).toISOString(),
        },
      ],
      page: 1,
      pageSize: 10,
      totalCount: 2,
      hasNextPage: false,
      hasPreviousPage: false,
    },
  },
};

const mockStats = {
  '1': {
    total: 45,
    pending: 20,
    accepted: 15,
    rejected: 8,
    viewed: 2,
  },
};

export const recruiterService = {
  getJobs: async (recruiterId: string) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(recruiterId);
    return {
      items: mockJobs,
      page: 1,
      pageSize: 10,
      totalCount: mockJobs.length,
      hasNextPage: false,
      hasPreviousPage: false,
    };
  },

  getJobApplicants: async (recruiterId: string, jobId: string): Promise<ApplicantsResponse> => {
    console.log(recruiterId);
    await new Promise((resolve) => setTimeout(resolve, 800));
    return (
      mockApplicants[jobId] || {
        jobId,
        jobTitle: '',
        developers: {
          items: [],
          page: 1,
          pageSize: 10,
          totalCount: 0,
          hasNextPage: false,
          hasPreviousPage: false,
        },
      }
    );
  },

  getJobStats: async (recruiterId: string, jobId: string): Promise<ApplicantsStats> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return (
      mockStats[jobId] || {
        total: 0,
        pending: 0,
        accepted: 0,
        rejected: 0,
        viewed: 0,
      }
    );
  },
};
