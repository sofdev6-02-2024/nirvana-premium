namespace Application.Recruiters.GetApplicantsByJobId;

using SkApplication.Contracts;

public sealed record GetApplicantsByJobIdQuery(
    Guid RecruiterId,
    Guid JobId,
    string Status,
    int Page,
    int PageSize
) : IQuery<Response> { }
