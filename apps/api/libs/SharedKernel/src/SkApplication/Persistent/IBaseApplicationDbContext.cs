namespace SkApplication.Persistent;

public interface IBaseApplicationDbContext
{
    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
}
