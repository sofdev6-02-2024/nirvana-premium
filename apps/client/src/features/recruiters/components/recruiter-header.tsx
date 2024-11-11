import Image from "next/image";
import { MapPin, CheckCircle } from "lucide-react";
import companyLogoUrl from "@/assets/company-logo-placeholder.png";
import { Recruiter } from "../lib/constant";

interface RecruiterDetailHeaderProps {
  recruiter: Recruiter;
}

export function RecruiterDetailHeader({
  recruiter,
}: RecruiterDetailHeaderProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-start gap-6">
        <Image
          src={companyLogoUrl}
          alt={`${recruiter.name} logo`}
          width={200}
          height={200}
          className="rounded-lg shadow-md"
        />
        <div className="flex-1 space-y-4">
          <div className="flex items-center gap-2">
            <h1 className="text-4xl font-bold">{recruiter.name}</h1>
            {recruiter.isVerified && (
              <CheckCircle className="h-6 w-6 text-orange-500" />
            )}
          </div>
          <div className="flex items-center text-muted-foreground">
            <MapPin className="mr-2 h-5 w-5" />
            {recruiter.location}
          </div>
          <p className="text-lg">{recruiter.description}</p>
        </div>
      </div>
    </div>
  );
}
