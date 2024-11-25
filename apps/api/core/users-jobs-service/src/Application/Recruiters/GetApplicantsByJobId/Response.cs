namespace Application.Recruiters.GetApplicantsByJobId;

using SkApplication.Responses;

public sealed class DeveloperResponse
{
    public required Guid DeveloperId { get; init; }
    public required string DeveloperName { get; init; }
    public required string DeveloperLastName { get; init; }
    public required Uri? DeveloperProfileUrl { get; init; }
    public required string Status { get; init; }
    public required DateTime CreatedAt { get; init; }
    public required DateTime UpdatedAt { get; init; }
}

public sealed class Response
{
    public required Guid JobId { get; init; }
    public required string JobTitle { get; init; }
    public required PagedList<DeveloperResponse> Developers { get; init; }
}
