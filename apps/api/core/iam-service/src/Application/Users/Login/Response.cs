namespace Application.Users.Login;

public sealed record Response(
    Guid UserId,
    string Email,
    string Role,
    string IdentityId,
    string Token
);
