namespace Domain.Joins.JobLanguages;

using Attributes.Languages;
using Entities.Jobs;
using SkDomain.Entities;

public sealed class JobLanguage : BaseRegister
{
    public Guid JobId { get; init; }
    public Guid LanguageId { get; init; }

    public Job Job { get; init; } = default!;
    public Language Language { get; init; } = default!;
}
