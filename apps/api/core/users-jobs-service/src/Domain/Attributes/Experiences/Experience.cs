namespace Domain.Attributes.Experiences;

using Entities.Developers;
using SkDomain.Entities;

public sealed class Experience : BaseEntity
{
    public required string Title { get; set; }
    public required string Employer { get; set; }
    public required DateTime StartDate { get; set; }

    public DateTime? EndDate { get; set; }
    public string? Description { get; set; }

    public required Guid DeveloperId { get; init; }
    public Developer Developer { get; init; } = default!;
}
