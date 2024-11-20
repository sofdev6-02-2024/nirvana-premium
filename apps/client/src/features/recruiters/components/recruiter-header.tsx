import companyLogoUrl from '@/assets/company-logo-placeholder.png';
import Badge from '@/components/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Building2, CheckCircle, Globe, MapPin, MessageSquare, Users } from 'lucide-react';
import Image from 'next/image';
import { Recruiter } from '../lib/constant';

interface RecruiterDetailHeaderProps {
  recruiter: Recruiter;
}

export function RecruiterDetailHeader({ recruiter }: RecruiterDetailHeaderProps) {
  return (
    <Card className="overflow-hidden">
      <div className="h-32 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent" />

      <div className="relative px-6 pb-6">
        <div className="relative -mt-16 flex justify-between">
          <div className="relative">
            <Image
              src={companyLogoUrl}
              alt={`${recruiter.name} logo`}
              width={120}
              height={120}
              className="rounded-xl border-4 border-background bg-background shadow-lg"
            />
            {recruiter.isVerified && (
              <div className="absolute -right-2 -top-2 rounded-full border-2 border-background bg-background p-0.5">
                <CheckCircle className="h-5 w-5 text-primary" />
              </div>
            )}
          </div>

          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="h-10">
              <MessageSquare className="mr-2 h-4 w-4" />
              Contact
            </Button>
            <Button size="sm" className="h-10">
              <Users className="mr-2 h-4 w-4" />
              Follow
            </Button>
          </div>
        </div>

        <div className="mt-4 space-y-4">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold sm:text-3xl">{recruiter.name}</h1>
              {recruiter.isVerified && (
                <Badge variant="outline" className="h-6">
                  <CheckCircle className="mr-1 h-3 w-3" />
                  Verified
                </Badge>
              )}
            </div>

            <div className="flex flex-wrap gap-4 text-muted-foreground">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>{recruiter.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <Globe className="h-4 w-4" />
                <a href="#" className="hover:underline">
                  company-website.com
                </a>
              </div>
              <div className="flex items-center gap-1">
                <Building2 className="h-4 w-4" />
                <span>50-100 employees</span>
              </div>
            </div>
          </div>

          <p className="text-base text-muted-foreground">{recruiter.description}</p>

          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { label: 'Active Jobs', value: '15' },
              { label: 'Total Hires', value: '120+' },
              { label: 'Response Rate', value: '94%' },
              { label: 'Avg. Response', value: '48h' },
            ].map((stat) => (
              <div key={stat.label} className="rounded-lg border bg-muted/50 p-4 text-center">
                <div className="text-2xl font-semibold">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
