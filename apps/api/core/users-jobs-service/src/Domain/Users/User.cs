namespace Domain.Users;

using Domain.Enums;
using SkDomain.Entities;

public sealed class User : BaseEntity
{
    public required string Email { get; init; }
    public bool DoOnboarding { get; init; }
    public required Guid IdentityId { get; init; }
    public required Role Role { get; init; }
}
