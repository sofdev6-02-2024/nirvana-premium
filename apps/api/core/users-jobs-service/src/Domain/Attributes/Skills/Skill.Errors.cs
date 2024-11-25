namespace Domain.Attributes.Skills;

using SkDomain.Errors;

public static class SkillErrors
{
    public static readonly Error NoSkillsFound = Error.NotFound(
        "Skills.NoSkillsFound",
        "No skills were found"
    );

    public static Error SkillNotFound(Guid skillId)
    {
        return Error.NotFound(
            "Skills.SkillNotFound",
            $"The skill with the ID {skillId} was not found"
        );
    }
}
