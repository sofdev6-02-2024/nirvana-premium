namespace Application.Recruiters.PatchDescription;

using SkApplication.Contracts;

public sealed record PatchDescriptionCommand : ICommand
{
    public required Guid RecruiterId { get; init; }
    public required string Description { get; init; }
}
