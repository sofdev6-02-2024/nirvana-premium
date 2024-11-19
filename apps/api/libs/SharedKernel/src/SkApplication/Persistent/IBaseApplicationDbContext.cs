namespace SkApplication.Persistent;

using Microsoft.EntityFrameworkCore;

public interface IBaseApplicationDbContext
{
    DbSet<TEntity> Set<TEntity>() where TEntity : class;
    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
}
