namespace Application.Developer.PatchDescription;

using SkApplication.Contracts;

public sealed record PatchDescriptionCommand : ICommand
{
    public required Guid DeveloperId { get; init; }
    public required string Description { get; init; }
}
