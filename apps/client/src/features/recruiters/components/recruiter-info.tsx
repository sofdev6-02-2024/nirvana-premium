import defaultImage from '@/assets/company-logo-placeholder.png';
import Image from 'next/image';
import { Recruiter } from '../lib/constant';

interface RecruiterInfoProps {
  recruiter: Recruiter;
}

export default function RecruiterInfo({ recruiter }: RecruiterInfoProps) {
  const { name, location, description, profilePictureUrl, isVerified } = recruiter;

  return (
    <div className="rounded-lg border p-5">
      <div className="flex items-center gap-3">
        <Image
          src={defaultImage || profilePictureUrl}
          alt={`${name}'s profile picture`}
          width={80}
          height={80}
          className="rounded-full"
        />
        <div>
          <h3 className="text-lg font-semibold">{name}</h3>
          <span className={`text-sm ${isVerified ? 'text-green-500' : 'text-red-500'}`}>
            {isVerified ? 'Verified' : 'Not Verified'}
          </span>
        </div>
      </div>
      <p className="mt-3 text-sm text-muted-foreground">{location}</p>
      <p className="mt-3 text-base">{description}</p>
    </div>
  );
}
