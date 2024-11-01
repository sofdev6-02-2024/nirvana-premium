namespace Domain.Joins.UserReviews;

using Entities.Users;
using SkDomain.Entities;

public sealed class UserReview : BaseRegister
{
    public Guid UserReviewedId { get; init; }
    public Guid UserReviewerId { get; init; }

    public User UserReviewed { get; init; } = default!;
    public User UserReviewer { get; init; } = default!;

    public required int Rating { get; set; }
    public string? Comment { get; set; }
}
