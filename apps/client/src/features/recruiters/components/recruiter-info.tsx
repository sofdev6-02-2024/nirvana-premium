import { Recruiter } from "../lib/constant";
import Image from "next/image";

interface RecruiterInfoProps {
  recruiter: Recruiter;
}

export default function RecruiterInfo({
  recruiter: { name, location, description, profilePictureUrl, isVerified },
}: RecruiterInfoProps) {
  return (
    <div className="rounded-lg border p-5">
      <div className="flex items-center gap-3">
        <Image
          src={profilePictureUrl || "/default-avatar.png"}
          alt={`${name}'s profile picture`}
          width={80}
          height={80}
          className="rounded-full"
        />
        <div>
          <h3 className="text-lg font-semibold">{name}</h3>
          {isVerified && (
            <span className="text-sm text-green-500">Verified</span>
          )}
        </div>
      </div>
      <p className="mt-3 text-sm text-muted-foreground">{location}</p>
      <p className="mt-3 text-base">{description}</p>
    </div>
  );
}
