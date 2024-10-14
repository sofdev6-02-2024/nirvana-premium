namespace Application.Core.Users.Login;

using Application.Contracts;

public sealed record LoginUserCommand(string Email, string Password) : ICommand<UserResponse>;
