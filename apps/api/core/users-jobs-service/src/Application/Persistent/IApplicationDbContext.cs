namespace Application.Persistent;

using Domain.Developers;
using Domain.Jobs;
using Domain.Languages;
using Domain.Recruiters;
using Domain.Skills;
using Domain.Specializations;
using Domain.Users;
using Microsoft.EntityFrameworkCore;
using SkApplication.Persistent;

public interface IApplicationDbContext : IBaseApplicationDbContext
{
    DbSet<Developer> Developers { get; }
    DbSet<Job> Jobs { get; }
    DbSet<Language> Languages { get; }
    DbSet<Recruiter> Recruiters { get; }
    DbSet<Skill> Skills { get; }
    DbSet<Specialization> Specializations { get; }
    DbSet<User> Users { get; }
}
