namespace Application.Developer.Post;

using SkApplication.Contracts;

public sealed record PostCommand : ICommand
{
    public required Guid UserId { get; init; }
    public required string FirstName { get; init; }
    public required string LastName { get; init; }
    public required string Modality { get; init; }
    public required int YearsOfExperience { get; init; }
    public required double SalaryExpected { get; init; }
    public required string Location { get; init; }
    public Uri? ProfilePicture { get; init; }
    public Uri? PortfolioUrl { get; init; }
    public Guid SpecializationId { get; init; }

    public IList<Guid> Skills { get; init; } = [];
    public IList<Guid> SpokenLanguages { get; init; } = [];
}
