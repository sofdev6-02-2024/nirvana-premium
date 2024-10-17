namespace Application.Jobs.Get;

using Domain.Jobs;
using Microsoft.EntityFrameworkCore;
using Persistent;
using SkApplication.Contracts;
using SkDomain.Results;

internal sealed class GetJobsQueryHandler(IApplicationDbContext context)
    : IQueryHandler<GetJobsQuery, IList<Response>>
{
    public async Task<Result<IList<Response>>> Handle(
        GetJobsQuery query,
        CancellationToken cancellationToken
    )
    {
        IEnumerable<Job> domainJobs = await context.Jobs.ToListAsync(cancellationToken);

        List<Response> jobs = domainJobs.Select(j => new Response(j)).ToList();

        if (jobs.Count == 0)
        {
            return Result.Failure<IList<Response>>(JobErrors.NotJobsFound);
        }

        return jobs;
    }
}
