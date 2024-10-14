namespace Domain.Users;

using SharedKernel.Entities.Bases;

public sealed class User : BaseEntity
{
    public required string Email { get; init; }
    public required string FirstName { get; init; }
    public required string LastName { get; init; }
    public required string IdentityId { get; init; }
}
