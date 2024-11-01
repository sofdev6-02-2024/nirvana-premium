namespace Domain.Attributes.Skills;

using Entities.Developers;
using Entities.Jobs;
using Joins.DeveloperSkills;
using Joins.JobSkills;
using SkDomain.Entities;

public sealed class Skill : BaseEntity
{
    public required string Name { get; init; }

    public IList<Developer> Developers { get; } = [];
    public IList<DeveloperSkill> DeveloperSkills { get; } = [];

    public IList<Job> Jobs { get; } = [];
    public IList<JobSkill> JobSkills { get; } = [];
}
