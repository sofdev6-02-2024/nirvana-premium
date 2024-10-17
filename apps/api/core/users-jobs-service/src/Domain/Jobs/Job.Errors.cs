namespace Domain.Jobs;

using SkDomain.Errors;

public static class JobErrors
{
    public static readonly Error NotFoundBySlug = Error.NotFound(
        "Jobs.NotFoundBySlug",
        "The job with the specified slug was not found"
    );

    public static readonly Error SlugNotUnique = Error.Conflict(
        "Jobs.SlugNotUnique",
        "The provided slug is not unique"
    );

    public static readonly Error NotJobsFound = Error.NotFound(
        "Jobs.NotJobsFound",
        "No jobs were found"
    );
}
