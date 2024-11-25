namespace Domain.Joins.JobDevelopers;

using SkDomain.Errors;

public static class JobDeveloperErrors
{
    public static Error DeveloperAlreadyApplied(Guid developerId, Guid jobId)
    {
        return Error.Conflict(
            "JobDevelopers.DeveloperAlreadyApplied",
            $"Developer with ID {developerId} already applied to job with ID {jobId}."
        );
    }
}
