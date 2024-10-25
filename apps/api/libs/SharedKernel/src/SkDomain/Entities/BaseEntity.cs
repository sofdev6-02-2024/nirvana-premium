namespace SkDomain.Entities;

using Events;

public abstract class BaseEntity : IEntity
{
    private readonly IList<IDomainEvent> _domainEvents = [];

    public Guid Id { get; init; } = Guid.NewGuid();

    public IList<IDomainEvent> DomainEvents => [.. _domainEvents];

    public void ClearDomainEvents()
    {
        _domainEvents.Clear();
    }

    public void Raise(IDomainEvent domainEvent)
    {
        _domainEvents.Add(domainEvent);
    }
}
