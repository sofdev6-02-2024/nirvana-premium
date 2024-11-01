namespace Application.Recruiters.GetAll;

public sealed class Response
{
    public Guid Id { get; init; }

    public required string Name { get; init; }

    public string? Location { get; init; }
    public string? Description { get; init; }
    public Uri? ProfilePictureUrl { get; init; }
    public bool IsVerified { get; init; }

    public Guid UserId { get; init; }

    public DateTime CreatedAt { get; init; }
    public DateTime UpdatedAt { get; init; }
}
