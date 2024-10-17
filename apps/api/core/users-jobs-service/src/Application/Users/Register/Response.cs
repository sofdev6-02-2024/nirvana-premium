namespace Application.Users.Register;

public sealed record Response(Guid UserId, string Email, string IdentityId);
