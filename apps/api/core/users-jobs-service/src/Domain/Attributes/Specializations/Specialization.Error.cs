namespace Domain.Attributes.Specializations;

using SkDomain.Errors;

public static class SpecializationErrors
{
    public static readonly Error NotSpecializationsFound = Error.NotFound(
        "Specializations.NotSpecializationsFound",
        "No specializations were found"
    );

    public static Error SpecializationNotFound(Guid specializationId)
    {
        return Error.NotFound(
            "Specializations.SpecializationNotFound",
            $"Specialization with ID {specializationId} was not found"
        );
    }
}
