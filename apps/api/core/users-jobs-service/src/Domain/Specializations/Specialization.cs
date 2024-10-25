namespace Domain.Specializations;

using SkDomain.Entities;

public sealed class Specialization : BaseEntity
{
    public required string Name { get; init; }
}
