namespace Application.Specializations.GetAll;

public sealed class Response
{
    public IReadOnlyList<Item> Specializations { get; init; } = new List<Item>();
}

public sealed class Item
{
    public Guid Id { get; init; }

    public required string Name { get; init; }
}
