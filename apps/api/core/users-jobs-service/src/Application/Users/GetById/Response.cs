namespace Application.Users.GetById;

public sealed record Response(Guid Id, string Email, string FirstName, string LastName);
