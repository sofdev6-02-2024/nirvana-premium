namespace Domain.Attributes.Specializations;

using Entities.Developers;
using Entities.Jobs;
using SkDomain.Entities;

public sealed class Specialization : BaseEntity
{
    public required string Name { get; init; }

    public IList<Job> Jobs { get; } = [];
    public IList<Developer> Developers { get; } = [];
}
