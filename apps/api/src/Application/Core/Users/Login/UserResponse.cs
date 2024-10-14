namespace Application.Core.Users.Login;

public sealed record UserResponse(Guid UserId, string Token, string IdentityId);
