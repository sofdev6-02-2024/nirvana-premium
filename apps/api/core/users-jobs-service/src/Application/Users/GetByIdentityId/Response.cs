namespace Application.Users.GetByIdentityId;

public sealed class Response
{
    public required Guid Id { get; init; }
    public required string Role { get; init; }
    public required string Email { get; init; }
    public required bool DoOnboarding { get; init; }
    public Guid? DeveloperId { get; init; }
    public Guid? RecruiterId { get; init; }
}
