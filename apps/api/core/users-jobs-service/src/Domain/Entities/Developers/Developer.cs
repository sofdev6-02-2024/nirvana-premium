namespace Domain.Entities.Developers;

using Attributes.Educations;
using Attributes.Experiences;
using Attributes.Languages;
using Attributes.Skills;
using Attributes.Specializations;
using Entities.Jobs;
using Enums;
using Joins.DeveloperLanguages;
using Joins.DeveloperSkills;
using Joins.JobDevelopers;
using SkDomain.Entities;
using Users;

public sealed class Developer : BaseEntity
{
    public required string Name { get; set; }
    public required string LastName { get; set; }
    public required double YearsOfExperience { get; set; }
    public required double SalaryPerHourExpected { get; set; }
    public required DeveloperModality ModalityPreferred { get; set; }

    public string? Location { get; set; }
    public Uri? ProfilePictureUrl { get; set; }
    public string? Description { get; set; }

    public required Guid UserId { get; init; }
    public User User { get; init; } = null!;

    public required Guid SpecializationId { get; init; }
    public Specialization Specialization { get; init; } = null!;

    public IList<Skill> Skills { get; } = [];
    public IList<DeveloperSkill> DeveloperSkills { get; } = [];

    public IList<Language> Languages { get; } = [];
    public IList<DeveloperLanguage> DeveloperLanguages { get; } = [];

    public IList<Job> Jobs { get; } = [];
    public IList<JobDeveloper> JobDevelopers { get; } = [];

    public IList<Experience> Experiences { get; } = [];
    public IList<Education> Educations { get; } = [];
}
