namespace Application.Languages.GetAll;

public sealed class Response
{
    public IReadOnlyList<Language> Languages { get; init; } = new List<Language>();
}

public sealed class Language
{
    public Guid Id { get; init; }

    public required string Name { get; init; }
}
