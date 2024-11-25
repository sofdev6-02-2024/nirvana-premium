namespace Application.Recruiters.Post;

using SkApplication.Contracts;

public sealed record PostCommand : ICommand
{
    public required Guid UserId { get; init; }
    public required string Name { get; init; }
    public required string Location { get; init; }
    public required Uri ProfilePicture { get; init; }
}
