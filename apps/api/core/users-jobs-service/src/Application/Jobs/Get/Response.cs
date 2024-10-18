namespace Application.Jobs.Get;

using Domain.Jobs;

public sealed class JobResponse(Job Job)
{
    public Guid Id { get; } = Job.Id;
    public string Slug { get; } = Job.Slug;
    public string Title { get; } = Job.Title;
    public string Type { get; } = Job.Type;
    public string LocationType { get; } = Job.LocationType;
    public string? Location { get; } = Job.Location;
    public string? Description { get; } = Job.Description;
    public int Salary { get; } = Job.Salary;
    public string CompanyName { get; } = Job.CompanyName;
    public string? ApplicationEmail { get; } = Job.ApplicationEmail;
    public Uri? ApplicationUrl { get; } = Job.ApplicationUrl;
    public Uri? CompanyLogoUrl { get; } = Job.CompanyLogoUrl;
    public bool Approved { get; } = Job.Approved;
    public DateTime CreatedAt { get; } = Job.CreatedAt;
}

public sealed class Response
{
    public IList<JobResponse> Jobs { get; init; } = [];
    public int Page { get; init; }
    public int PageSize { get; init; }
    public int TotalCount { get; init; }
    public bool HasNextPage => Page * PageSize < TotalCount;
    public bool HasPreviousPage => Page > 1;
}
