namespace Application.Core.Jobs.GetAll;

using Application.Contracts;

public sealed record GetAllJobsQuery() : IQuery<IList<JobResponse>>;
