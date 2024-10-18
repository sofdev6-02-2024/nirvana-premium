namespace Application.Persistent;

using Domain.Jobs;
using Microsoft.EntityFrameworkCore;
using SkApplication.Persistent;

public interface IApplicationDbContext : IBaseApplicationDbContext
{
    DbSet<Job> Jobs { get; }
}
