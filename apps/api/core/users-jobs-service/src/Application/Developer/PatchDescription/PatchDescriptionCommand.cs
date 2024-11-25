namespace Application.Developer.PatchDescription;

using SkApplication.Contracts;

public sealed record PatchDescriptionCommand(Guid DeveloperId) : ICommand
{
    public required string Description { get; init; }
}
