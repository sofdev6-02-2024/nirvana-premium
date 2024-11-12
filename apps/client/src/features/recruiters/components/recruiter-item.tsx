import Image from "next/image";
import { MapPin, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import defaultImage from "@/assets/company-logo-placeholder.png";
import Badge from "@/components/badge";
import { Recruiter } from "../lib/constant";

interface RecruiterListItemProps {
  recruiter: Recruiter;
  className?: string;
}

export function RecruiterListItem({
  recruiter: {
    name,
    location,
    description,
    profilePictureUrl,
    isVerified,
    companyType = "Software Developer Company", 
  },
  className,
}: RecruiterListItemProps) {
  return (
    <Card className={cn("transition-all hover:shadow-md", className)}>
      <div className={cn("flex items-start gap-4 p-6")}>
        <div className="relative h-16 w-16 shrink-0">
          <Image
            src={defaultImage || profilePictureUrl}
            alt={`${name}'s profile picture`}
            width={64}
            height={64}
            className={cn(
              "rounded-lg object-cover",
              "border border-border bg-background",
            )}
          />
        </div>

        <div className={cn("flex-1 space-y-3")}>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h3
                  className={cn(
                    "font-semibold text-foreground",
                    "transition-colors hover:text-primary",
                  )}
                >
                  {name}
                </h3>
                {isVerified ? (
                  <Badge
                    variant="success"
                    className={cn("flex items-center gap-1 px-2 py-0")}
                  >
                    <CheckCircle className="h-3 w-3" />
                    <span className="text-xs">Verified</span>
                  </Badge>
                ) : (
                  <Badge
                    variant="secondary"
                    className={cn("flex items-center gap-1 px-2 py-0")}
                  >
                    <span className="text-xs">Not Verified</span>
                  </Badge>
                )}
              </div>
              <p className={cn("text-sm text-muted-foreground")}>
                {companyType}
              </p>
            </div>

            <Button
              variant="secondary"
              size="sm"
              className={cn("flex items-center gap-2")}
            >
              <CheckCircle className="h-4 w-4" />
              Following
            </Button>
          </div>

          <p className={cn("line-clamp-2 text-sm text-foreground")}>
            {description}
          </p>

          <div
            className={cn(
              "flex items-center gap-2",
              "text-sm text-muted-foreground",
            )}
          >
            <MapPin className="h-4 w-4" />
            <span>{location}</span>
          </div>

          <div className={cn("flex flex-wrap gap-2 pt-2")}>
            <Button variant="outline" size="sm">
              View Profile
            </Button>
            <Button variant="outline" size="sm">
              Send Message
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
