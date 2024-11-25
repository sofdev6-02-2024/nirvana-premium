namespace Domain.Entities.Developers;

using SkDomain.Errors;

public static class DeveloperErrors
{
    public static readonly Error NotDevelopoersFound = Error.NotFound(
        "Developers.NotDevelopoersFound",
        "No developers were found"
    );

    public static Error DeveloperNotFound(Guid developerId)
    {
        return Error.NotFound(
            "Developers.DeveloperNotFound",
            $"Developer with id {developerId} was not found"
        );
    }
}
