namespace Application.Developer.GetApplicationsStatsById;

using SkApplication.Contracts;

public sealed record GetApplicationsStatsByIdQuery(Guid DeveloperId) : IQuery<Response> { }
