namespace Domain.Joins.JobSkills;

using Domain.Attributes.Skills;
using Domain.Entities.Jobs;
using SkDomain.Entities;

public sealed class JobSkill : BaseRegister
{
    public Guid JobId { get; init; }
    public Guid SkillId { get; init; }

    public Job Job { get; init; } = default!;
    public Skill Skill { get; init; } = default!;
}
