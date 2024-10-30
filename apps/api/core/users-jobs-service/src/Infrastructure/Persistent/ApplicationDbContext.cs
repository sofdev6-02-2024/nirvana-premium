namespace Infrastructure.Persistent;

using System.Reflection;
using Application.Persistent;
using Domain.Developers;
using Domain.Jobs;
using Domain.Languages;
using Domain.Recruiters;
using Domain.Skills;
using Domain.Specializations;
using Domain.Users;
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
    public required DbSet<Developer> Developers { get; set; }
    public required DbSet<Job> Jobs { get; set; }
    public required DbSet<Language> Languages { get; set; }
    public required DbSet<Recruiter> Recruiters { get; set; }
    public required DbSet<Skill> Skills { get; set; }
    public required DbSet<Specialization> Specializations { get; set; }
    public required DbSet<User> Users { get; set; }
}
