/* eslint-disable @next/next/no-img-element */
'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { applicationsService } from '@/features/home/lib/mock';
import { Application, ApplicationStats } from '@/features/home/types/home';
import { cn } from '@/lib/utils';
import { useUser } from '@clerk/nextjs';
import { Building2, FileText } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function DevPage() {
  const { user, isSignedIn, isLoaded } = useUser();
  const router = useRouter();
  const [currentTab, setCurrentTab] = useState('all');
  const [applications, setApplications] = useState<Application[]>([]);
  const [stats, setStats] = useState<ApplicationStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      if (!user?.id) return;

      setIsLoading(true);
      try {
        const [applicationsData, statsData] = await Promise.all([
          applicationsService.getApplications(user.id),
          applicationsService.getStats(user.id),
        ]);

        setApplications(applicationsData.items);
        setStats(statsData);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, [user?.id]);

  if (!isLoaded || !isSignedIn) {
    return null;
  }

  const filteredApplications = applications.filter((app) => {
    if (currentTab === 'all') return true;
    return app.status.toLowerCase() === currentTab;
  });

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Welcome back, {user.firstName}!</h1>
          <p className="text-muted-foreground">
            {stats
              ? `You have ${stats.pending} pending applications`
              : 'Loading your applications...'}
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={() => router.push('/profile/portafolio')}
            className="flex items-center gap-2"
          >
            <FileText className="w-4 h-4" />
            Edit your profile
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatsCard icon={FileText} label="Total" value={stats?.total ?? 0} />
        <StatsCard icon={Building2} label="Pending" value={stats?.pending ?? 0} color="yellow" />
        <StatsCard icon={FileText} label="Accepted" value={stats?.accepted ?? 0} color="green" />
        <StatsCard icon={FileText} label="Rejected" value={stats?.rejected ?? 0} color="red" />
      </div>

      <Card>
        <Tabs defaultValue="all" className="w-full" onValueChange={setCurrentTab}>
          <div className="px-4 pt-4">
            <TabsList className="grid grid-cols-4 gap-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="published">Pending</TabsTrigger>
              <TabsTrigger value="accepted">Accepted</TabsTrigger>
              <TabsTrigger value="rejected">Rejected</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value={currentTab} className="p-4">
            {isLoading ? (
              <ApplicationsSkeleton />
            ) : filteredApplications.length === 0 ? (
              <EmptyState />
            ) : (
              <div className="space-y-4">
                {filteredApplications.map((application) => (
                  <ApplicationCard key={application.id} application={application} />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </Card>
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

function ApplicationCard({ application }: { application: Application }) {
  return (
    <Card>
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex gap-4">
            {application.recruiterProfileUrl && (
              <img
                src={application.recruiterProfileUrl}
                alt={application.recruiterName}
                className="w-12 h-12 rounded-full"
              />
            )}
            <div>
              <h3 className="font-semibold text-lg">{application.jobTitle}</h3>
              <p className="text-sm text-muted-foreground">{application.recruiterName}</p>
              <p className="text-sm text-muted-foreground">
                Applied {new Date(application.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
          <ApplicationStatus status={application.status} />
        </div>
      </div>
    </Card>
  );
}

function ApplicationStatus({ status }: { status: Application['status'] }) {
  const statusStyles = {
    Published: 'bg-blue-50 text-blue-700',
    Viewed: 'bg-yellow-50 text-yellow-700',
    Accepted: 'bg-green-50 text-green-700',
    Rejected: 'bg-red-50 text-red-700',
  };

  return (
    <span className={cn('px-3 py-1 rounded-full text-sm font-medium', statusStyles[status])}>
      {status}
    </span>
  );
}

function EmptyState() {
  return (
    <div className="text-center py-12">
      <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
      <h3 className="mt-4 text-lg font-semibold">No applications found</h3>
      <p className="text-muted-foreground">Start applying to jobs to see them here.</p>
    </div>
  );
}

function ApplicationsSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <Card key={i}>
          <div className="p-6 animate-pulse">
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-muted rounded-full" />
              <div className="flex-1">
                <div className="h-5 bg-muted rounded w-1/3 mb-2" />
                <div className="h-4 bg-muted rounded w-1/4" />
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
