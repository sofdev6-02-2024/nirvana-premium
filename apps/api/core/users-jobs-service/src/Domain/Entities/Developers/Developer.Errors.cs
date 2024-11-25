namespace Domain.Entities.Developers;

using SkDomain.Errors;

public static class DeveloperErrors
{
    public static readonly Error NotDevelopersFound = Error.NotFound(
        "Developers.NotDevelopersFound",
        "No developers were found"
    );

    public static Error DeveloperNotFound(Guid jobId)
    {
        return Error.NotFound(
            "Developers.DeveloperNotFound",
            $"Developer with id {jobId} was not found"
        );
    }
}
