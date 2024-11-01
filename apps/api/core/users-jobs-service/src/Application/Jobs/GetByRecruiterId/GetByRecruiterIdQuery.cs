namespace Application.Jobs.GetByRecruiterId;

using SkApplication.Contracts;
using SkApplication.Responses;

public sealed record GetByRecruiterIdQuery(Guid RecruiterId, int Page, int PageSize)
    : IQuery<PagedList<Response>>;
