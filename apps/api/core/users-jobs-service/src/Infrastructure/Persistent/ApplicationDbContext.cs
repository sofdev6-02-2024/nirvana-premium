namespace Infrastructure.Persistent;

using System.Reflection;
using Application.Persistent;
using Domain.Jobs;
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
    public required DbSet<User> Users { get; set; }
    public required DbSet<Job> Jobs { get; set; }
}
