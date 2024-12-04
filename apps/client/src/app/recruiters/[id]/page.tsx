import Badge from '@/components/badge';
import JobListItem from '@/features/jobs/components/job-list-item';
import { ProfileView } from '@/features/profile/components/profile-view';
import { getJobsByRecruiter, getRecruiterById } from '@/features/recruiters/lib/recruiter-service';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs';
import { Briefcase, Building2, CheckCircle, MapPin } from 'lucide-react';
import { Metadata, ResolvingMetadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';

interface Props {
  params: { id: string };
}

export async function generateMetadata(
  { params }: Props,
  _parent: ResolvingMetadata,
): Promise<Metadata> {
  try {
    const recruiter = await getRecruiterById(params.id);
    return {
      title: `${recruiter?.name} | Company Profile`,
      description: recruiter?.description,
    };
  } catch {
    return {
      title: 'Company Not Found',
      description: 'The requested company profile could not be found.',
    };
  }
}

export default async function RecruiterProfilePage({ params }: Props) {
  const [recruiter, jobs] = await Promise.all([
    getRecruiterById(params.id),
    getJobsByRecruiter(params.id),
  ]);

  if (!recruiter) {
    notFound();
  }

  let profileData = null;
  if (recruiter && recruiter.description) {
    try {
      profileData = JSON.parse(recruiter.description);
    } catch (jsonError) {
      console.warn('Invalid JSON format in recruiter.description:', jsonError);
    }
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-muted/10">
      <main className="container py-6 lg:py-10">
        {/* Profile Header Card */}
        <div className="rounded-lg border bg-card shadow-sm">
          {/* Company Info Section */}
          <div className="p-6 border-b">
            <div className="flex items-start gap-6">
              <Image
                src={recruiter.profilePictureUrl}
                alt={`${recruiter.name}'s profile picture`}
                width={100}
                height={100}
                className="rounded-lg object-cover"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold">{recruiter.name}</h1>
                  {recruiter.isVerified && (
                    <Badge variant="success" className="flex items-center gap-1">
                      <CheckCircle className="h-3 w-3" />
                      <span>Verified</span>
                    </Badge>
                  )}
                </div>
                <p className="text-muted-foreground flex items-center gap-2 mt-2">
                  <MapPin className="h-4 w-4" />
                  {recruiter.location}
                </p>
              </div>
            </div>
          </div>

          <Tabs defaultValue="jobs" className="w-full">
            {/* Navigation Tabs */}
            <div className="px-6 border-b">
              <TabsList className="w-full justify-start h-auto bg-transparent p-0 space-x-6">
                <TabsTrigger
                  value="jobs"
                  className="relative h-12 rounded-none border-b-2 border-transparent px-4 pb-3 pt-3 font-medium data-[state=active]:border-primary data-[state=active]:text-primary"
                >
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4" />
                    <span>Published Jobs</span>
                    <Badge variant="secondary" className="ml-2">
                      {jobs.length}
                    </Badge>
                  </div>
                </TabsTrigger>
                <TabsTrigger
                  value="about"
                  className="relative h-12 rounded-none border-b-2 border-transparent px-4 pb-3 pt-3 font-medium data-[state=active]:border-primary data-[state=active]:text-primary"
                >
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4" />
                    <span>About Company</span>
                  </div>
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              <TabsContent value="jobs" className="m-0">
                {jobs.length > 0 ? (
                  <div className="grid gap-4">
                    {jobs.map((job) => (
                      <JobListItem key={job.id} job={job} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">No jobs published yet.</p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="about" className="m-0">
                {profileData ? (
                  <ProfileView data={profileData} role="recruiter" />
                ) : (
                  <p className="text-muted-foreground">No company profile information available.</p>
                )}
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
