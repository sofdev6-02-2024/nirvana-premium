import { formatMoney, relativeDate } from "@/lib/utils";
import { Banknote, Briefcase, Globe2, MapPin, Clock } from "lucide-react";
import Markdown from "@/components/markdown";
import { Job } from "@/features/jobs/lib/constants";

interface JobPageProps {
  job: Job;
}

export default function JobPage({
  job: {
    title,
    description,
    modality,
    schedule,
    location,
    salaryPerHour,
    createdAt,
  },
}: JobPageProps) {
  return (
    <section className="w-full grow space-y-5">
      <h1 className="text-2xl font-bold">{title}</h1>
      <div className="text-muted-foreground">
        <p className="flex items-center gap-1.5">
          <Briefcase size={16} className="shrink-0" />
          {schedule === "FullTime" ? "Full-Time" : "Part-Time"}
        </p>
        <p className="flex items-center gap-1.5">
          <MapPin size={16} className="shrink-0" />
          {location}
        </p>
        <p className="flex items-center gap-1.5">
          <Globe2 size={16} className="shrink-0" />
          {modality}
        </p>
        <p className="flex items-center gap-1.5">
          <Banknote size={16} className="shrink-0" />
          {formatMoney(salaryPerHour)} / hour
        </p>
        <p className="flex items-center gap-1.5">
          <Clock size={16} className="shrink-0" />
          Posted {relativeDate(new Date(createdAt))}
        </p>
      </div>

      {description && <Markdown>{description}</Markdown>}
    </section>
  );
}
