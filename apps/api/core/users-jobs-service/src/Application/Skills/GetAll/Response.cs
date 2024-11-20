namespace Application.Skills.GetAll;

public sealed class Response
{
    public IReadOnlyList<Skill> Skills { get; init; } = new List<Skill>();
}

public sealed class Skill
{
    public Guid Id { get; init; }

    public required string Name { get; init; }
}
