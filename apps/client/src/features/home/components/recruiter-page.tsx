'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { useUser } from '@clerk/nextjs';
import { Briefcase, Building2, Clock, FileText, Plus, User, Users } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { recruiterService } from '../lib/recruiter';
import { ApplicantsStats, JobApplicant, RecruiterJob } from '../types/recruiter';

export default function RecruiterHome() {
  const { user } = useUser();
  const router = useRouter();
  const [jobs, setJobs] = useState<RecruiterJob[]>([]);
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [applicants, setApplicants] = useState<JobApplicant[]>([]);
  const [stats, setStats] = useState<ApplicantsStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadInitialData();
  }, [user?.id]);

  const loadInitialData = async () => {
    if (!user?.id) return;

    try {
      setIsLoading(true);
      const jobsData = await recruiterService.getJobs(user.id);
      setJobs(jobsData.items);

      if (jobsData.items.length > 0) {
        const firstJobId = jobsData.items[0].id;
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

  const loadJobDetails = async (jobId: string) => {
    if (!user?.id) return;

    try {
      const [applicantsData, statsData] = await Promise.all([
        recruiterService.getJobApplicants(user.id, jobId),
        recruiterService.getJobStats(user.id, jobId),
      ]);

      setApplicants(applicantsData.developers.items);
      setStats(statsData);
    } catch (error) {
      console.error('Error loading job details:', error);
      toast.error('Failed to load job details');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Welcome back, {user?.firstName}!</h1>
          <p className="text-muted-foreground">
            You have {stats?.pending || 0} applications pending review
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={() => router.push('/profile/company/about')}
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
                    onStatusChange={async (status) => {
                      toast.success(`Status updated to ${status}`);
                    }}
                  />
                ))}
                {applicants.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    No applications found
                  </div>
                )}
              </TabsContent>

              <TabsContent value="pending" className="mt-6 space-y-4">
                {applicants
                  .filter((a) => a.status === 'Published')
                  .map((applicant) => (
                    <ApplicantCard
                      key={applicant.developerId}
                      applicant={applicant}
                      onStatusChange={async (status) => {
                        toast.success(`Status updated to ${status}`);
                      }}
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
  icon: unknown;
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
  job: RecruiterJob;
  isSelected: boolean;
  onClick: () => void;
}) {
  return (
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
        <span className="text-xs px-2 py-1 rounded-full bg-blue-50 text-blue-700">
          {job.modality}
        </span>
        <span className="text-xs px-2 py-1 rounded-full bg-green-50 text-green-700">
          {job.schedule}
        </span>
      </div>
      <p className="text-sm mt-2">${job.salaryPerHour}/hr</p>
    </button>
  );
}

function ApplicantCard({
  applicant,
  onStatusChange,
}: {
  applicant: JobApplicant;
  onStatusChange: (status: JobApplicant['status']) => Promise<void>;
}) {
  const statusStyles = {
    Published: 'bg-blue-50 text-blue-700',
    Viewed: 'bg-yellow-50 text-yellow-700',
    Accepted: 'bg-green-50 text-green-700',
    Rejected: 'bg-red-50 text-red-700',
  };

  return (
    <Card>
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex gap-4">
            {applicant.developerProfileUrl ? (
              <img
                src={applicant.developerProfileUrl}
                alt={`${applicant.developerName} ${applicant.developerLastName}`}
                className="w-12 h-12 rounded-full object-cover"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                <User className="w-6 h-6 text-muted-foreground" />
              </div>
            )}
            <div>
              <h3 className="font-semibold">
                {applicant.developerName} {applicant.developerLastName}
              </h3>
              <p className="text-sm text-muted-foreground">
                Applied {new Date(applicant.createdAt).toLocaleDateString()}
              </p>
              <span
                className={cn(
                  'text-xs px-2 py-1 rounded-full mt-2 inline-block',
                  statusStyles[applicant.status],
                )}
              >
                {applicant.status}
              </span>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onStatusChange('Accepted')}
              disabled={applicant.status === 'Accepted'}
            >
              Accept
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onStatusChange('Rejected')}
              disabled={applicant.status === 'Rejected'}
              className="text-destructive hover:text-destructive"
            >
              Reject
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
