namespace Application.Jobs.PostApply;

using SkApplication.Contracts;

public sealed record PostCommand : ICommand
{
    public required Guid JobId { get; init; }
    public required Guid DeveloperId { get; init; }
}
