namespace Application.Recruiters.GetJobsById;

using SkApplication.Contracts;
using SkApplication.Responses;

public sealed record GetJobsByIdQuery(Guid RecruiterId, int Page, int PageSize)
    : IQuery<PagedList<Response>>;
