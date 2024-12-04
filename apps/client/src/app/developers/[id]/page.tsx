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
    let profileData = null;

    if (developer.description) {
      try {
        const parsedData = JSON.parse(developer.description);
        if (parsedData.sections && parsedData.theme && parsedData.metadata) {
          profileData = developer.description;
        } else {
          console.warn('Developer description is not in the expected profile format');
        }
      } catch (error) {
        console.warn('Developer description is not in JSON format:', error);
        profileData = JSON.stringify({
          sections: [
            {
              id: 'default-about',
              type: 'about',
              content: {
                text: developer.description,
                headline: `About ${developer.name}`,
                specialization: developer.specialization?.name || '',
              },
              layout: {
                columns: 1,
                order: 0,
              },
            },
          ],
          theme: {
            template: 'modern',
            layout: {
              spacing: 'comfortable',
              style: 'card',
              maxWidth: 1200,
            },
            colors: {
              primary: 'hsl(24.6 95% 53.1%)',
              secondary: 'hsl(60 4.8% 95.9%)',
              accent: 'hsl(60 4.8% 95.9%)',
              background: 'hsl(0 0% 100%)',
              surface: 'hsl(60 4.8% 95.9%)',
              text: {
                primary: 'hsl(20 14.3% 4.1%)',
                secondary: 'hsl(25 5.3% 44.7%)',
              },
            },
          },
          metadata: {
            lastUpdated: new Date().toISOString(),
            createdAt: new Date().toISOString(),
            isPublished: true,
            version: 1,
            isDraft: false,
          },
        });
      }
    }

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
