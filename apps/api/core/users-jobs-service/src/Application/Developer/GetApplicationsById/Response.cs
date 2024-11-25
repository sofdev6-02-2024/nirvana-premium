namespace Application.Developer.GetApplicationsById;

public sealed class Response
{
    public required string Status { get; init; }
    public required Guid JobId { get; init; }
    public required string JobTitle { get; init; }
    public required Guid RecruiterId { get; init; }
    public required string RecruiterName { get; init; }
    public required Uri? RecruiterProfileUrl { get; init; }
    public required DateTime CreatedAt { get; init; }
    public required DateTime UpdatedAt { get; init; }
}
