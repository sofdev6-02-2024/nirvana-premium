namespace Application.Developer.GetById;

public sealed class LanguageResponse
{
    public required Guid Id { get; init; }
    public required string Name { get; init; }
}

public sealed class SkillResponse
{
    public required Guid Id { get; init; }
    public required string Name { get; init; }
}

public sealed class SpecializationResponse
{
    public required Guid Id { get; init; }
    public required string Name { get; init; }
}

public sealed class Response
{
    public required Guid Id { get; init; }
    public required string Name { get; init; }
    public required string LastName { get; init; }
    public required double YearsOfExperience { get; init; }
    public required double SalaryPerHourExpected { get; init; }
    public string? Description { get; init; }
    public string? Location { get; init; }
    public Uri? PortfolioUrl { get; init; }
    public Uri? ProfilePictureUrl { get; init; }
    public required SpecializationResponse Specialization { get; init; }
    public IList<SkillResponse> Skills { get; init; } = [];
    public IList<LanguageResponse> SpokenLanguages { get; init; } = [];
}
