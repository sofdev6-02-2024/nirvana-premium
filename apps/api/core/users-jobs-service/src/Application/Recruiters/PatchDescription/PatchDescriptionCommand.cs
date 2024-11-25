namespace Application.Recruiters.PatchDescription;

using SkApplication.Contracts;

public sealed record PatchDescriptionCommand(Guid RecruiterId) : ICommand
{
    public required string Description { get; init; }
}
