namespace Domain.Attributes.Educations;

using Entities.Developers;
using SkDomain.Entities;

public sealed class Education : BaseEntity
{
    public required string Degree { get; set; }
    public required string Institution { get; set; }
    public required DateTime StartDate { get; set; }

    public DateTime? EndDate { get; set; }
    public string? Description { get; set; }

    public required Guid DeveloperId { get; init; }
    public Developer Developer { get; init; } = default!;
}
