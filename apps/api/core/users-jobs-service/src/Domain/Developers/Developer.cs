namespace Domain.Developers;

using Domain.Enums;
using Domain.Languages;
using Domain.Skills;
using Domain.Specializations;
using Domain.Users;
using SkDomain.Entities;

public sealed class Developer : BaseEntity
{
    public required string Name { get; init; }
    public required string LastName { get; init; }
    public required double YearsOfExperience { get; init; }
    public required double SalaryPerHourExpected { get; init; }
    public required Modality ModalityPreferred { get; init; }

    public Uri? ProfilePictureUrl { get; init; }
    public string? Description { get; init; }

    public required Guid UserId { get; init; }
    public User User { get; init; } = null!;

    public required Guid SpecializationId { get; init; }
    public Specialization Specialization { get; init; } = null!;

    public IList<Skill> Skills { get; init; } = [];
    public IList<Language> Languages { get; init; } = [];
}
