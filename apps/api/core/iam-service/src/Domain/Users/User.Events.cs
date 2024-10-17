namespace Domain.Users;

using SkDomain.Events;

public sealed record UserRegisteredDomainEvent(Guid UserId) : IDomainEvent;
