namespace Domain.Developers;

using SkDomain.Errors;

public static class DeveloperErrors
{
    public static Error DeveloperNotFound(Guid developerId)
    {
        return Error.NotFound(
            "Developers.DeveloperNotFound",
            $"Developer with id {developerId} was not found"
        );
    }
}
