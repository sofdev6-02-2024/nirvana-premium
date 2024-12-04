import Badge from '@/components/badge';
import { Card } from '@/components/ui/card';
import { MapPin, Shield, ShieldCheck } from 'lucide-react';
import Image from 'next/image';
import { Recruiter } from '../lib/constant';

interface RecruiterInfoProps {
  recruiter: Recruiter;
}

export default function RecruiterInfo({ recruiter }: RecruiterInfoProps) {
  const { name, location, profilePictureUrl, isVerified } = recruiter;

  return (
    <Card className="overflow-hidden">
      <div className="relative h-20 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent" />

      <div className="relative px-6 pb-6">
        <div className="absolute -top-10 flex items-end">
          <div className="relative">
            <Image
              src={profilePictureUrl}
              alt={`${name}'s profile picture`}
              width={80}
              height={80}
              className="rounded-full border-4 border-background bg-background"
            />
            {isVerified && (
              <div className="absolute -right-2 -top-2 rounded-full border-2 border-background bg-background p-0.5">
                <ShieldCheck className="h-5 w-5 text-primary" />
              </div>
            )}
          </div>
        </div>

        <div className="pt-14">
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">{name}</h3>
              <Badge variant={isVerified ? 'outline' : 'secondary'} className="h-6">
                {isVerified ? (
                  <div className="flex items-center gap-1">
                    <Shield className="h-3 w-3" />
                    <span>Verified</span>
                  </div>
                ) : (
                  'Not Verified'
                )}
              </Badge>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{location}</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
