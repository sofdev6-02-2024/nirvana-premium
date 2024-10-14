namespace SharedKernel.Entities.Interfaces;

using Events;

public interface IEntity
{
    Guid Id { get; }

    IList<IDomainEvent> DomainEvents { get; }

    void ClearDomainEvents();

    void Raise(IDomainEvent domainEvent);
}
