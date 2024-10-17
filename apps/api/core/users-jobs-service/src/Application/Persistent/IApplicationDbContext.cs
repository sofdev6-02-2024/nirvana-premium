namespace Application.Persistent;

using Domain.Jobs;
using Domain.Users;
using Microsoft.EntityFrameworkCore;
using SkApplication.Persistent;

public interface IApplicationDbContext : IBaseApplicationDbContext
{
    DbSet<User> Users { get; }
    DbSet<Job> Jobs { get; }
}
