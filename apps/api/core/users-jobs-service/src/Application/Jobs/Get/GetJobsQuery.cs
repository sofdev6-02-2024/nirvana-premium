namespace Application.Jobs.Get;

using SkApplication.Contracts;

public sealed record GetJobsQuery() : IQuery<IList<Response>>;
