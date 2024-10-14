namespace Domain.Jobs;

using SharedKernel.Entities.Bases;

public sealed class Job : BaseEntity
{
    public required string Slug { get; init; }
    public required string Title { get; init; }
    public required string Type { get; init; }
    public required string LocationType { get; init; }
    public string? Location { get; init; }
    public string? Description { get; init; }
    public required int Salary { get; init; }
    public required string CompanyName { get; init; }
    public string? ApplicationEmail { get; init; }
    public Uri? ApplicationUrl { get; init; }
    public Uri? CompanyLogoUrl { get; init; }
    public required bool Approved { get; init; }
    public required DateTime CreatedAt { get; init; }
}
