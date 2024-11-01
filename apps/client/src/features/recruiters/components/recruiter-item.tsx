import Image from "next/image";
import { MapPin, CheckCircle } from "lucide-react";
import companyLogoUrl from "@/assets/company-logo-placeholder.png";
import { Recruiter } from "../lib/constant";

interface RecruiterListItemProps {
  recruiter: Recruiter;
}

export function RecruiterListItem({
  recruiter: { name, location, description, profilePictureUrl, isVerified },
}: RecruiterListItemProps) {
  return (
    <div className="flex max-w-full items-start gap-4 rounded-lg border bg-white p-6 shadow-md">
      <Image
        src={companyLogoUrl}
        alt={`${name} logo`}
        width={175}
        height={175}
        className="rounded-lg shadow"
      />

      <div className="flex flex-grow flex-col">
        <div className="flex items-center space-x-2 pb-2">
          <h3 className="text-xl font-semibold">{name}</h3>
          {isVerified && (
            <span className="flex items-center text-sm text-orange-500">
              <CheckCircle size={16} className="mr-1" />
              Verified Company
            </span>
          )}
        </div>
        <div className="pt-3 text-left">
          <p className="text-sm text-gray-600">Software Developer Company</p>
          <p className="mt-2 text-gray-800">{description}</p>
        </div>

        <div className="mt-4 flex flex-col items-start justify-between">
          <div className="flex items-center pt-2 text-gray-500">
            <MapPin size={16} className="mr-1" />
            <span>{location}</span>
          </div>
          <button className="rounded-full bg-orange-500 px-4 py-1 text-sm font-semibold text-white transition hover:bg-orange-600">
            ✓ Following
          </button>
        </div>
      </div>
    </div>
  );
}
