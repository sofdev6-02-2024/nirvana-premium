namespace SkInfrastructure.Persistent;

using System.Reflection;
using MediatR;
using Microsoft.EntityFrameworkCore;
using SkApplication.Persistent;
using SkDomain.Entities;
using SkDomain.Events;
using SkInfrastructure.Configurations;

public abstract class BaseApplicationDbContext(
    DbContextOptions options,
    IPublisher publisher,
    Assembly assembly
) : DbContext(options), IBaseApplicationDbContext
{
    public abstract Task SeedDataAsync();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        _ = modelBuilder.ApplyConfigurationsFromAssembly(assembly);

        _ = modelBuilder.HasDefaultSchema(Constants.DefaultSchema);
    }

    public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        int result = await base.SaveChangesAsync(cancellationToken);

        await PublishDomainEventsAsync();

        return result;
    }

    private async Task PublishDomainEventsAsync()
    {
        IList<IDomainEvent> domainEvents = ChangeTracker
            .Entries<IEntity>()
            .Select(entry => entry.Entity)
            .SelectMany(entity =>
            {
                IList<IDomainEvent> domainEvents = entity.DomainEvents;

                entity.ClearDomainEvents();

                return domainEvents;
            })
            .ToList();

        foreach (IDomainEvent domainEvent in domainEvents)
        {
            await publisher.Publish(domainEvent);
        }
    }
}
