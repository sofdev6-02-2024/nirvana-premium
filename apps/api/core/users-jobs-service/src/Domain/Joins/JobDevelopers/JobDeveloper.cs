namespace Domain.Joins.JobDevelopers;

using Domain.Entities.Developers;
using Domain.Entities.Jobs;
using Domain.Enums;
using SkDomain.Entities;

public sealed class JobDeveloper : BaseRegister
{
    public Guid JobId { get; init; }
    public Guid DeveloperId { get; init; }

    public Job Job { get; init; } = default!;
    public Developer Developer { get; init; } = default!;

    public ApplicantStatus Status { get; set; } = ApplicantStatus.Published;
}
