namespace SkInfrastructure.Seed;

using SkApplication.Persistent;

public interface ISeedEntity
{
    DbPriority Priority { get; }
    void SeedData(IBaseApplicationDbContext context);
}
