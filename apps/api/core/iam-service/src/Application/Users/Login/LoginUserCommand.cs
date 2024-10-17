namespace Application.Users.Login;

using SkApplication.Contracts;

public sealed record LoginUserCommand(string Email, string Password) : ICommand<Response>;
