import { DeveloperProfile } from '@/features/developer/components/developer-profile';
import { getDeveloperById } from '@/features/developer/lib/developer-service';
import { ProfileView } from '@/features/profile/components/profile-view';
import { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';

interface Props {
  params: { id: string };
}

export async function generateMetadata(
  { params }: Props,
  _parent: ResolvingMetadata,
): Promise<Metadata> {
  try {
    const developer = await getDeveloperById(params.id);

    return {
      title: `${developer.name} ${developer.lastName} | Developer Profile`,
      description: developer.description,
    };
  } catch {
    return {
      title: 'Developer Not Found',
      description: 'The requested developer profile could not be found.',
    };
  }
}

export default async function Page({ params }: Props) {
  try {
    const developer = await getDeveloperById(params.id);
    const profileData = developer.description ? JSON.parse(developer.description) : null;

    return (
      <div className="min-h-[calc(100vh-4rem)] bg-muted/10">
        <main className="container py-6 lg:py-10">
          <div className="space-y-6">
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <DeveloperProfile developer={developer} />
            </div>

            <div className="rounded-lg border bg-card p-6 shadow-sm">
              {profileData ? (
                <ProfileView data={profileData} role="developer" />
              ) : (
                <p className="text-muted-foreground">No profile information available.</p>
              )}
            </div>
          </div>
        </main>
      </div>
    );
  } catch (error) {
    console.error('Error rendering developer page:', error);
    notFound();
  }
}
