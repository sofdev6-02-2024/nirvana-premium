namespace Application.Persistent;

using Domain.Users;
using Microsoft.EntityFrameworkCore;
using SkApplication.Persistent;

public interface IApplicationDbContext : IBaseApplicationDbContext
{
    DbSet<User> Users { get; }
}
