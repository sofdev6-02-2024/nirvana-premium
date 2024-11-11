import { Job } from "@/features/jobs/lib/constants";
import Image from "next/image";
import { Banknote, Clock, MapPin, Building2 } from "lucide-react";
import { formatMoney, relativeDate } from "@/lib/utils";
import Badge from "@/components/badge";
import defaultImage from "@/assets/company-logo-placeholder.png";

interface JobListItemProps {
  job: Job;
}

export default function JobListItem({ job }: JobListItemProps) {
  return (
    <article className="group relative flex w-full items-start gap-5 rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:border-gray-300 hover:shadow-md">
      <Image
        src={defaultImage || job.recruiterLogo}
        alt={`${job.title} company logo`}
        width={130}
        height={130}
        className="rounded-xl border border-gray-100 shadow-sm"
      />

      <div className="flex-grow space-y-3">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-800">{job.title}</h2>
            <Badge variant={job.status === "Open" ? "success" : "secondary"}>
              {job.status}
            </Badge>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Building2 size={16} />
              <span>{job.schedule}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin size={16} />
              <span>{job.location}</span>
            </div>
            <Badge variant="outline">{job.modality}</Badge>
          </div>
        </div>

        <p className="line-clamp-2 text-gray-700">{job.description}</p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-600">
            <Banknote size={18} className="shrink-0 text-gray-500" />
            <span>{formatMoney(job.salaryPerHour)} / hour</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Clock size={16} className="shrink-0" />
            <span>Posted {relativeDate(new Date(job.createdAt))}</span>
          </div>
        </div>
      </div>
    </article>
  );
}
