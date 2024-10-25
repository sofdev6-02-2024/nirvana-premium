namespace Domain.Developers;

using SkDomain.Errors;

public static class DeveloperErrors
{
    public static readonly Error DeveloperNotFound = Error.NotFound(
        "Developers.DeveloperNotFound",
        "Developer not found"
    );
}
