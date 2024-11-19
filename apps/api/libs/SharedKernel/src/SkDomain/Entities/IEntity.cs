namespace SkDomain.Entities;

using Events;

public interface IEntity : IRegister
{
    Guid Id { get; }

    IList<IDomainEvent> DomainEvents { get; }

    void ClearDomainEvents();

    void Raise(IDomainEvent domainEvent);
}
