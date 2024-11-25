namespace Application.Jobs.PostApply;

using SkApplication.Contracts;

public sealed class PostCommand : ICommand
{
    public required Guid JobId { get; init; }
    public required Guid DeveloperId { get; init; }
    public required string Status { get; init; }
}
