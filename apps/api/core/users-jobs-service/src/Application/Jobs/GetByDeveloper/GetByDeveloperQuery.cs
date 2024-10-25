namespace Application.Jobs.GetByDeveloper;

using SkApplication.Contracts;
using SkApplication.Responses;

public sealed record GetByDeveloperQuery(Guid DeveloperId, int Page, int PageSize)
    : IQuery<PagedList<Response>>;
