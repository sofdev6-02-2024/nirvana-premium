namespace Domain.Recruiters;

using Domain.Jobs;
using Domain.Users;
using SkDomain.Entities;

public sealed class Recruiter : BaseEntity
{
    public required string Name { get; init; }

    public bool IsVerified { get; init; }
    public string? Location { get; init; }
    public string? Description { get; init; }
    public Uri? ProfilePictureUrl { get; init; }

    public required Guid UserId { get; init; }
    public User User { get; init; } = null!;

    public IList<Job> Jobs { get; init; } = [];
}
