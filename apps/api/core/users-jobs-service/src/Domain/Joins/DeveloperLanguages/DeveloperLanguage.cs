namespace Domain.Joins.DeveloperLanguages;

using Attributes.Languages;
using Entities.Developers;
using SkDomain.Entities;

public sealed class DeveloperLanguage : BaseRegister
{
    public Guid DeveloperId { get; init; }
    public Guid LanguageId { get; init; }

    public Developer Developer { get; init; } = default!;
    public Language Language { get; init; } = default!;
}
