namespace Domain.Jobs;

using SkDomain.Errors;

public static class JobErrors
{
    public static readonly Error NotJobsFound = Error.NotFound(
        "Jobs.NotJobsFound",
        "No jobs were found"
    );
}
