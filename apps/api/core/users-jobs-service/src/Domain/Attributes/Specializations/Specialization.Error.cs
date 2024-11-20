namespace Domain.Attributes.Specializations;

using SkDomain.Errors;

public static class SpecializationErrors
{
    public static readonly Error NotSpecializationsFound = Error.NotFound(
        "Specializations.NotSpecializationsFound",
        "No specializations were found"
    );
}
