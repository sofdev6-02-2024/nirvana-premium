namespace Domain.Languages;

using Domain.Developers;
using Domain.Jobs;
using SkDomain.Entities;

public sealed class Language : BaseEntity
{
    public required string Name { get; init; }
    public IList<Developer> Developers { get; init; } = [];
    public IList<Job> Jobs { get; init; } = [];
}
