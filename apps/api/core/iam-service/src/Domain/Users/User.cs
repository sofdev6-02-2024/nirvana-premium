namespace Domain.Users;

using SkDomain.Entities;

public sealed class User : BaseEntity
{
    public required string Email { get; init; }
    public required string FirstName { get; init; }
    public required string LastName { get; init; }
    public required string IdentityId { get; init; }
    public required UserRole Role { get; init; }
}
