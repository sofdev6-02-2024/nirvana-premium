namespace Domain.Entities.Recruiters;

using Jobs;
using SkDomain.Entities;
using Users;

public sealed class Recruiter : BaseEntity
{
    public required string Name { get; set; }

    public string? Location { get; set; }
    public string? Description { get; set; }
    public Uri? ProfilePictureUrl { get; set; }
    public bool? IsVerified { get; set; } = false;

    public required Guid UserId { get; init; }
    public User User { get; init; } = null!;

    public IList<Job> Jobs { get; } = [];
}
