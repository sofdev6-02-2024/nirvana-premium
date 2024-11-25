namespace Application.Developer.GetApplicationsStatsById;

public sealed class Response
{
    public required int Total { get; init; }
    public required int Pending { get; init; }
    public required int Accepted { get; init; }
    public required int Rejected { get; init; }
    public required int Viewed { get; init; }
}
