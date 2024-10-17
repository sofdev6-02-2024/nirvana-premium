namespace Application.Users.Login;

public sealed record Response(Guid UserId, string Token, string IdentityId);
