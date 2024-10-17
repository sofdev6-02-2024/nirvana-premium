namespace Application.Users.Register;

using SkApplication.Contracts;

public sealed record RegisterUserCommand(
    string Email,
    string FirstName,
    string LastName,
    string Password
) : ICommand<Response>;
