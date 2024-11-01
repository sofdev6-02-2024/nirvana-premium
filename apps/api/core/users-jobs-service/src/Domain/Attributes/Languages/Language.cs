namespace Domain.Attributes.Languages;

using Entities.Developers;
using Entities.Jobs;
using Joins.DeveloperLanguages;
using Joins.JobLanguages;
using SkDomain.Entities;

public sealed class Language : BaseEntity
{
    public required string Name { get; init; }

    public IList<Developer> Developers { get; } = [];
    public IList<DeveloperLanguage> DeveloperLanguages { get; } = [];

    public IList<Job> Jobs { get; } = [];
    public IList<JobLanguage> JobLanguages { get; } = [];
}
