namespace Domain.Joins.UserFollows;

using Entities.Users;
using SkDomain.Entities;

public sealed class UserFollow : BaseRegister
{
    public Guid UserFollowedId { get; init; }
    public Guid UserFollowerId { get; init; }

    public User UserFollowed { get; init; } = default!;
    public User UserFollower { get; init; } = default!;
}
