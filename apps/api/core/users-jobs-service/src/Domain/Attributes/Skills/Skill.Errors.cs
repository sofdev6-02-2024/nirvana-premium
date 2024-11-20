namespace Domain.Attributes.Skills;

using SkDomain.Errors;

public static class SkillErrors
{
    public static readonly Error NoSkillsFound = Error.NotFound(
        "Skills.NoSkillsFound",
        "No skills were found"
    );
}
