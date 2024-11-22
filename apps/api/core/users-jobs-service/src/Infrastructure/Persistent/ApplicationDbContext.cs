namespace Infrastructure.Persistent;

using System.Reflection;
using Application.Persistent;
using MediatR;
using Microsoft.EntityFrameworkCore;
using SkInfrastructure.Persistent;

public sealed class ApplicationDbContext(
    DbContextOptions<ApplicationDbContext> options,
    IPublisher publisher
)
    : BaseApplicationDbContext(options, publisher, Assembly.GetExecutingAssembly()),
        IApplicationDbContext
{
    public required DbSet<Domain.Attributes.Educations.Education> Educations { get; init; }
    public required DbSet<Domain.Attributes.Experiences.Experience> Experiences { get; init; }

    public required DbSet<Domain.Attributes.JobAttachments.JobAttachment> JobAttachments { get; init; }

    public required DbSet<Domain.Attributes.Languages.Language> Languages { get; init; }
    public required DbSet<Domain.Attributes.Skills.Skill> Skills { get; init; }

    public required DbSet<Domain.Attributes.Specializations.Specialization> Specializations { get; init; }

    public required DbSet<Domain.Entities.Developers.Developer> Developers { get; init; }
    public required DbSet<Domain.Entities.Jobs.Job> Jobs { get; init; }
    public required DbSet<Domain.Entities.Recruiters.Recruiter> Recruiters { get; init; }
    public required DbSet<Domain.Entities.Users.User> Users { get; init; }

    public required DbSet<Domain.Joins.DeveloperLanguages.DeveloperLanguage> DeveloperLanguages { get; init; }

    public required DbSet<Domain.Joins.DeveloperSkills.DeveloperSkill> DeveloperSkills { get; init; }

    public required DbSet<Domain.Joins.JobDevelopers.JobDeveloper> JobDevelopers { get; init; }
    public required DbSet<Domain.Joins.JobLanguages.JobLanguage> JobLanguages { get; init; }
    public required DbSet<Domain.Joins.JobSkills.JobSkill> JobSkills { get; init; }
    public required DbSet<Domain.Joins.UserFollows.UserFollow> UserFollows { get; init; }
    public required DbSet<Domain.Joins.UserReviews.UserReview> UserReviews { get; init; }

    public required DbSet<Domain.Pages.LandingInfos.LandingInfo> LandingInfos { get; init; }
}
