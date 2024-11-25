namespace Application.Users.Post;

using SkApplication.Contracts;

public sealed record PostCommand(string IdentityId, string Role, string Email) : ICommand;
