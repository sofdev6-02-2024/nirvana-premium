namespace Application.Core.Jobs.GetAll;

using Contracts;
using Domain.Jobs;
using Domain.Jobs.Errors;
using Microsoft.EntityFrameworkCore;
using Persistent;
using SharedKernel.Results;

internal sealed class GetAllJobsQueryHandler(IApplicationDbContext context)
    : IQueryHandler<GetAllJobsQuery, IList<JobResponse>>
{
    public async Task<Result<IList<JobResponse>>> Handle(
        GetAllJobsQuery query,
        CancellationToken cancellationToken
    )
    {
        IEnumerable<Job> domainJobs = await context.Jobs.ToListAsync(cancellationToken);

        List<JobResponse> jobs = domainJobs.Select(j => new JobResponse(j)).ToList();

        if (jobs.Count == 0)
        {
            return Result.Failure<IList<JobResponse>>(JobErrors.NotJobsFound);
        }

        return jobs;
    }
}
