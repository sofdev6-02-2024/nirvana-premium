namespace Application.Core.Users.Register;

using Contracts;

public sealed record RegisterUserCommand(
    string Email,
    string FirstName,
    string LastName,
    string Password
) : ICommand<UserResponse>;
