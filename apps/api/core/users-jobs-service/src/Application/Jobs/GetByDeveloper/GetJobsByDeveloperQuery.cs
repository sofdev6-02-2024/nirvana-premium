namespace Application.Jobs.GetByDeveloper;

using SkApplication.Contracts;
using SkApplication.Responses;

public sealed record GetJobsByDeveloperQuery(int Page, int PageSize, string DeveloperId)
    : IQuery<PagedList<Response>>;
