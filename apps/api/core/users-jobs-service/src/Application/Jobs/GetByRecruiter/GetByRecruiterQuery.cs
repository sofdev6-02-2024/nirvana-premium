namespace Application.Jobs.GetByRecruiter;

using SkApplication.Contracts;
using SkApplication.Responses;

public sealed record GetByRecruiterQuery(Guid RecruiterId, int Page, int PageSize)
    : IQuery<PagedList<Response>>;
