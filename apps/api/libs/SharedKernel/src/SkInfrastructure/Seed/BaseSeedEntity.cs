namespace SkInfrastructure.Seed;

using SkApplication.Persistent;
using SkDomain.Entities;

public abstract class BaseSeedEntity<T>(DbPriority priority = DbPriority.One)
    : ISeedEntity
    where T : BaseEntity
{
    protected abstract IEnumerable<T> GetData();
    public DbPriority Priority { get; } = priority;

    public void SeedData(IBaseApplicationDbContext context)
    {
        context.Set<T>().AddRange(GetData());
    }
}
