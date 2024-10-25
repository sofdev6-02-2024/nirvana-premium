namespace Application.Jobs.GetByDeveloper;

public sealed class Response
{
    public Guid Id { get; init; }

    public required string Title { get; init; }
    public required string Schedule { get; init; }
    public required string Modality { get; init; }
    public Uri? RecruiterLogo { get; init; }
    public string? Location { get; init; }

    public required string Description { get; init; }
    public required double SalaryPerHour { get; init; }
    public required string Status { get; init; }

    public DateTime CreatedAt { get; init; }
    public DateTime? UpdatedAt { get; init; }
}
