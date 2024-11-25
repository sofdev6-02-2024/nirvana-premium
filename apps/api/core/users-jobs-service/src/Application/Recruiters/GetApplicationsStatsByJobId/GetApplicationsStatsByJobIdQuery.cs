namespace Application.Recruiters.GetApplicationsStatsByJobId;

using SkApplication.Contracts;

public sealed record GetApplicationsStatsByJobIdQuery(Guid RecruiterId, Guid JobId)
    : IQuery<Response> { }
