namespace Domain.Jobs;

using Domain.Enums;
using Domain.Languages;
using Domain.Recruiters;
using Domain.Skills;
using SkDomain.Entities;

public sealed class Job : BaseEntity
{
    public required string Title { get; init; }
    public required string Description { get; init; }
    public required double SalaryPerHour { get; init; }
    public required DateTime DueDate { get; init; }
    public required DateTime CreatedAt { get; init; }

    public required Modality Modality { get; init; }
    public required Schedule Schedule { get; init; }
    public required JobStatus Status { get; init; }

    public string? Location { get; init; }
    public DateTime? UpdatedAt { get; init; }

    public required Guid RecruiterId { get; init; }
    public Recruiter Recruiter { get; init; } = null!;

    public IList<Skill> Skills { get; init; } = [];
    public IList<Language> Languages { get; init; } = [];
}
