/* eslint-disable @next/next/no-img-element */
'use client';

import Badge from '@/components/badge';
import LoadingScreen from '@/components/loading/loading-screen';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ApplicationStatus, Job } from '@/features/jobs/lib/constants';
import { JobService } from '@/features/jobs/lib/job-service';
import {
  getJobApplicants,
  getJobsByRecruiter,
  getJobStats,
} from '@/features/recruiters/lib/recruiter-service';
import { useUserStore } from '@/features/users/store/user-store';
import { cn } from '@/lib/utils';
import { useAuth } from '@clerk/nextjs';
import { Briefcase, Building2, Clock, FileText, Plus, User, Users } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { ApplicantsStats, JobApplicant } from '../types/recruiter';

export default function RecruiterHome() {
  const { user } = useUserStore();
  const { getToken } = useAuth();
  const router = useRouter();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [applicants, setApplicants] = useState<JobApplicant[]>([]);
  const [stats, setStats] = useState<ApplicantsStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadInitialData();
  }, [user?.recruiterId]);

  const loadInitialData = async () => {
    if (!user?.recruiterId) return;

    try {
      setIsLoading(true);
      const token = await getToken();
      if (!token) throw new Error('Authentication token not available');

      const jobsData = await getJobsByRecruiter(user.recruiterId);
      setJobs(jobsData);

      if (jobsData.length > 0) {
        const firstJobId = jobsData[0].id;
        setSelectedJob(firstJobId);
        await loadJobDetails(firstJobId);
      }
    } catch (error) {
      console.error('Error loading data:', error);
      toast.error('Failed to load data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = async (developerId: string, newStatus: ApplicationStatus) => {
    if (!selectedJob || !user?.recruiterId) return;

    try {
      const token = await getToken();
      if (!token) throw new Error('Authentication token not available');
      console.log(token);
      await JobService.updateApplicationStatus(selectedJob, developerId, newStatus, token);

      await loadJobDetails(selectedJob);
      toast.success(`Application ${newStatus.toLowerCase()}`);
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Failed to update application status');
    }
  };

  const loadJobDetails = async (jobId: string) => {
    if (!user?.recruiterId) return;

    try {
      const token = await getToken();
      if (!token) throw new Error('Authentication token not available');

      const [applicantsData, statsData] = await Promise.all([
        getJobApplicants(user.recruiterId, jobId, token),
        getJobStats(user.recruiterId, jobId, token),
      ]);

      setApplicants(applicantsData.developers.items);
      setStats(statsData);
    } catch (error) {
      console.error('Error loading job details:', error);
      toast.error('Failed to load job details');
    }
  };

  if (isLoading) {
    return <LoadingScreen fullScreen text="Loading..." />;
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Welcome back</h1>
          <p className="text-muted-foreground">
            You have {stats?.pending || 0} applications pending review
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={() => router.push('/profile/about')}
            className="flex items-center gap-2"
          >
            <Building2 className="w-4 h-4" />
            Company Profile
          </Button>
          <Button onClick={() => router.push('/jobs/new')} className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Post New Job
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatsCard label="Active Jobs" value={jobs.length} icon={Briefcase} color="blue" />
        <StatsCard label="Total Applicants" value={stats?.total || 0} icon={Users} color="green" />
        <StatsCard label="Pending Review" value={stats?.pending || 0} icon={Clock} color="yellow" />
        <StatsCard label="Accepted" value={stats?.accepted || 0} icon={FileText} color="green" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Active Jobs</h2>
          <div className="space-y-4">
            {jobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                isSelected={job.id === selectedJob}
                onClick={() => {
                  setSelectedJob(job.id);
                  loadJobDetails(job.id);
                }}
              />
            ))}
            {jobs.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">No active jobs found</div>
            )}
          </div>
        </Card>

        <Card className="lg:col-span-2 p-6">
          <h2 className="text-lg font-semibold mb-4">Applications</h2>
          {selectedJob ? (
            <Tabs defaultValue="all">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="accepted">Accepted</TabsTrigger>
                <TabsTrigger value="rejected">Rejected</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="mt-6 space-y-4">
                {applicants.map((applicant) => (
                  <ApplicantCard
                    key={applicant.developerId}
                    applicant={applicant}
                    onStatusChange={(status) => handleStatusChange(applicant.developerId, status)}
                  />
                ))}
              </TabsContent>

              <TabsContent value="pending" className="mt-6 space-y-4">
                {applicants
                  .filter((a) => a.status === 'Published')
                  .map((applicant) => (
                    <ApplicantCard
                      key={applicant.developerId}
                      applicant={applicant}
                      onStatusChange={(status) => handleStatusChange(applicant.developerId, status)}
                    />
                  ))}
              </TabsContent>
            </Tabs>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              Select a job to view applications
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}

function StatsCard({
  label,
  value,
  icon: Icon,
  color = 'blue',
}: {
  label: string;
  value: number;
  icon: React.ComponentType<{ className?: string }>;
  color?: 'blue' | 'green' | 'yellow' | 'red';
}) {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-700',
    green: 'bg-green-50 text-green-700',
    yellow: 'bg-yellow-50 text-yellow-700',
    red: 'bg-red-50 text-red-700',
  };

  return (
    <Card>
      <div className="p-6">
        <div className="flex items-center gap-4">
          <div className={cn('p-2 rounded-lg', colorClasses[color])}>
            <Icon className="w-5 h-5" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">{label}</p>
            <p className="text-2xl font-bold">{value}</p>
          </div>
        </div>
      </div>
    </Card>
  );
}

function JobCard({
  job,
  isSelected,
  onClick,
}: {
  job: Job;
  isSelected: boolean;
  onClick: () => void;
}) {
  const router = useRouter();

  return (
    <div className="relative">
      <button
        onClick={onClick}
        className={cn(
          'w-full p-4 rounded-lg border text-left transition-colors',
          isSelected ? 'border-primary bg-primary/5' : 'border-muted hover:border-primary/50',
        )}
      >
        <h3 className="font-semibold">{job.title}</h3>
        <p className="text-sm text-muted-foreground">{job.location || 'Remote'}</p>
        <div className="flex gap-2 mt-2">
          <Badge variant="secondary">{job.modality}</Badge>
          <Badge variant="secondary">{job.schedule}</Badge>
        </div>
        <p className="text-sm mt-2">${job.salaryPerHour}/hr</p>
      </button>
      <Button
        variant="ghost"
        size="sm"
        className="absolute top-2 right-2"
        onClick={(e) => {
          e.stopPropagation();
          router.push(`/jobs/${job.id}`);
        }}
      >
        View
      </Button>
    </div>
  );
}

interface ApplicantCardProps {
  applicant: JobApplicant;
  onStatusChange: (status: JobApplicant['status']) => void;
}

function ApplicantCard({ applicant, onStatusChange }: ApplicantCardProps) {
  const router = useRouter();
  const [isUpdating, setIsUpdating] = useState(false);

  return (
    <Card>
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex gap-4">
            <button
              onClick={() => router.push(`/developers/${applicant.developerId}`)}
              className="focus:outline-none focus:ring-2 focus:ring-primary rounded-full"
            >
              {applicant.developerProfileUrl ? (
                <img
                  src={applicant.developerProfileUrl}
                  alt={`${applicant.developerName} ${applicant.developerLastName}`}
                  className="w-12 h-12 rounded-full object-cover hover:ring-2 hover:ring-primary"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80">
                  <User className="w-6 h-6 text-muted-foreground" />
                </div>
              )}
            </button>
            <div>
              <button
                onClick={() => router.push(`/developers/${applicant.developerId}`)}
                className="font-semibold hover:text-primary text-left"
              >
                {applicant.developerName} {applicant.developerLastName}
              </button>
              <p className="text-sm text-muted-foreground">
                Applied {new Date(applicant.createdAt).toLocaleDateString()}
              </p>
              <Badge variant={getStatusVariant(applicant.status)}>{applicant.status}</Badge>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={async () => {
                setIsUpdating(true);
                await onStatusChange('Accepted');
                setIsUpdating(false);
              }}
              disabled={applicant.status === 'Accepted' || isUpdating}
            >
              {isUpdating ? 'Updating...' : 'Accept'}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={async () => {
                setIsUpdating(true);
                await onStatusChange('Rejected');
                setIsUpdating(false);
              }}
              disabled={applicant.status === 'Rejected' || isUpdating}
              className="text-destructive hover:text-destructive"
            >
              {isUpdating ? 'Updating...' : 'Reject'}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}

function getStatusVariant(
  status: JobApplicant['status'],
): 'default' | 'secondary' | 'destructive' | 'outline' {
  switch (status) {
    case 'Published':
      return 'default';
    case 'Viewed':
      return 'secondary';
    case 'Accepted':
      return 'outline';
    case 'Rejected':
      return 'destructive';
    default:
      return 'default';
  }
}
