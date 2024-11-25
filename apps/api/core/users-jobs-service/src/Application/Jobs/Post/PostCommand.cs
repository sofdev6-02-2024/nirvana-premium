namespace Application.Jobs.Post;

using SkApplication.Contracts;

public sealed class PostCommand : ICommand
{
    public required string Title { get; init; }
    public required double SalaryPerHour { get; init; }
    public required string Schedule { get; init; }
    public required string Modality { get; init; }
    public string? Location { get; init; }
    public required string Description { get; init; }
    public IList<Guid> Skills { get; init; } = [];
    public IList<Guid> Languages { get; init; } = [];
    public required Guid RecruiterId { get; init; }
    public required Guid SpecializationId { get; init; }
}
