namespace Application.Jobs.Get;

using SkApplication.Contracts;

public sealed record GetJobsQuery(int Page, int PageSize) : IQuery<Response>;
