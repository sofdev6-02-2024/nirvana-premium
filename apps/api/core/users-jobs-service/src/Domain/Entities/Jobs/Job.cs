namespace Domain.Entities.Jobs;

using Attributes.JobAttachments;
using Attributes.Languages;
using Attributes.Skills;
using Attributes.Specializations;
using Entities.Developers;
using Entities.Recruiters;
using Enums;
using Joins.JobDevelopers;
using Joins.JobLanguages;
using Joins.JobSkills;
using SkDomain.Entities;

public sealed class Job : BaseEntity
{
    public required string Title { get; set; }
    public required double SalaryPerHour { get; set; }

    public required Schedule Schedule { get; set; }
    public required JobModality Modality { get; set; }
    public required JobStatus Status { get; set; }

    public required string Description { get; set; }
    public string? Location { get; set; }

    public required Guid RecruiterId { get; init; }
    public Recruiter Recruiter { get; init; } = null!;

    public required Guid SpecializationId { get; init; }
    public Specialization Specialization { get; init; } = null!;

    public IList<Skill> Skills { get; init; } = [];
    public IList<JobSkill> JobSkills { get; init; } = [];

    public IList<Language> Languages { get; init; } = [];
    public IList<JobLanguage> JobLanguages { get; init; } = [];

    public IList<Developer> Developers { get; init; } = [];
    public IList<JobDeveloper> JobDevelopers { get; init; } = [];

    public IList<JobAttachment> Attachments { get; init; } = [];
}
