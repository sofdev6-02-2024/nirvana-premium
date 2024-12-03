namespace Application.Jobs.PatchApply;

using SkApplication.Contracts;

public sealed record PatchCommand : ICommand
{
    public required Guid JobId { get; init; }
    public required Guid DeveloperId { get; init; }
    public required string Status { get; init; }
}
