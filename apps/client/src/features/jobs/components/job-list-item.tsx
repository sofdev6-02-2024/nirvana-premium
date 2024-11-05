import { Job } from "@/features/jobs/lib/constants";
import Image from "next/image";
import companyLogoPlaceholder from "@/assets/company-logo-placeholder.png";
import { Banknote, Clock } from "lucide-react";
import { formatMoney, relativeDate } from "@/lib/utils";
import Badge from "@/components/badge";

interface JobListItemProps {
  job: Job;
}

export default function JobListItem({
  job: {
    title,
    salaryPerHour,
    location,
    description,
    modality,
    schedule,
    createdAt,
  },
}: JobListItemProps) {
  return (
    <article className="flex max-w-full items-start gap-5 rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:border-gray-300 hover:shadow-md">
      <Image
        src={companyLogoPlaceholder}
        alt={`${title} company logo`}
        width={130}
        height={130}
        className="rounded-xl border border-gray-100 shadow-sm"
      />

      <div className="flex-grow space-y-3">
        <div className="space-y-2">
          <h2 className="text-left text-xl font-bold text-gray-800">{title}</h2>

          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <span>{schedule}</span>
            <span>|</span>
            <span>{modality}</span>
            <span>|</span>
            <span>{location}</span>
          </div>
        </div>

        <p className="line-clamp-2 text-gray-700">{description}</p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-600">
            <Banknote size={18} className="shrink-0 text-gray-500" />
            <span>{formatMoney(salaryPerHour)} / hour</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Clock size={16} className="shrink-0" />
            <span>Posted {relativeDate(new Date(createdAt))}</span>
          </div>
        </div>
      </div>
    </article>
  );
}
