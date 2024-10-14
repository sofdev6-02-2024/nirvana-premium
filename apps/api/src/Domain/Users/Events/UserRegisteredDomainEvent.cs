namespace Domain.Users.Events;

using SharedKernel.Events;

public sealed record UserRegisteredDomainEvent(Guid UserId) : IDomainEvent;
