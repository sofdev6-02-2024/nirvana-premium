namespace Application.Developer.GetApplicationsById;

using SkApplication.Contracts;
using SkApplication.Responses;

public sealed record GetApplicationsByIdQuery(
    Guid DeveloperId,
    string Status,
    int Page,
    int PageSize
) : IQuery<PagedList<Response>>;
