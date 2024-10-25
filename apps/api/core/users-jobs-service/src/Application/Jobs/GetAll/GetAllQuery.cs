namespace Application.Jobs.GetAll;

using SkApplication.Contracts;
using SkApplication.Responses;

public sealed record GetAllQuery(int Page, int PageSize) : IQuery<PagedList<Response>>;
