namespace SkDomain.Entities;

using Events;

public interface IEntity
{
    Guid Id { get; }

    DateTime CreatedAt { get; }
    DateTime UpdatedAt { get; }

    bool IsActive { get; }

    IList<IDomainEvent> DomainEvents { get; }

    void ClearDomainEvents();

    void Raise(IDomainEvent domainEvent);
}
