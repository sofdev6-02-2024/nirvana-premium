namespace Application.Persistent;

using Microsoft.EntityFrameworkCore;
using SkApplication.Persistent;

public interface IApplicationDbContext : IBaseApplicationDbContext
{
    DbSet<Domain.Attributes.Educations.Education> Educations { get; }
    DbSet<Domain.Attributes.Experiences.Experience> Experiences { get; }
    DbSet<Domain.Attributes.JobAttachments.JobAttachment> JobAttachments { get; }
    DbSet<Domain.Attributes.Languages.Language> Languages { get; }
    DbSet<Domain.Attributes.Skills.Skill> Skills { get; }
    DbSet<Domain.Attributes.Specializations.Specialization> Specializations { get; }

    DbSet<Domain.Entities.Developers.Developer> Developers { get; }
    DbSet<Domain.Entities.Jobs.Job> Jobs { get; }
    DbSet<Domain.Entities.Recruiters.Recruiter> Recruiters { get; }
    DbSet<Domain.Entities.Users.User> Users { get; }

    DbSet<Domain.Joins.DeveloperLanguages.DeveloperLanguage> DeveloperLanguages { get; }
    DbSet<Domain.Joins.DeveloperSkills.DeveloperSkill> DeveloperSkills { get; }
    DbSet<Domain.Joins.JobDevelopers.JobDeveloper> JobDevelopers { get; }
    DbSet<Domain.Joins.JobLanguages.JobLanguage> JobLanguages { get; }
    DbSet<Domain.Joins.JobSkills.JobSkill> JobSkills { get; }
    DbSet<Domain.Joins.UserFollows.UserFollow> UserFollows { get; }
    DbSet<Domain.Joins.UserReviews.UserReview> UserReviews { get; }

    DbSet<Domain.Pages.LandingInfos.LandingInfo> LandingInfos { get; }
}
