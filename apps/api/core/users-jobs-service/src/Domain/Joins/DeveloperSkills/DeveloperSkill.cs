namespace Domain.Joins.DeveloperSkills;

using Attributes.Skills;
using Entities.Developers;
using SkDomain.Entities;

public sealed class DeveloperSkill : BaseRegister
{
    public Guid DeveloperId { get; init; }
    public Guid SkillId { get; init; }

    public Developer Developer { get; init; } = default!;
    public Skill Skill { get; init; } = default!;
}
