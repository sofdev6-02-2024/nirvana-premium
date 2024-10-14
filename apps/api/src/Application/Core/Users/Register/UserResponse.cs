namespace Application.Core.Users.Register;

public sealed record UserResponse(Guid UserId, string Email, string IdentityId);
