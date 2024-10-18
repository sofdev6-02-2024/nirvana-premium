namespace Application.Jobs.Get;

using Domain.Jobs;
using Microsoft.EntityFrameworkCore;
using Persistent;
using SkApplication.Contracts;
using SkDomain.Results;

internal sealed class GetJobsQueryHandler(IApplicationDbContext context)
    : IQueryHandler<GetJobsQuery, Response>
{
    public async Task<Result<Response>> Handle(
        GetJobsQuery query,
        CancellationToken cancellationToken
    )
    {
        IQueryable<Job> domainJobs = context.Jobs;

        if (!await domainJobs.AnyAsync(cancellationToken))
        {
            return Result.Failure<Response>(JobErrors.NotJobsFound);
        }

        int totalCount = await domainJobs.CountAsync(cancellationToken);

        IQueryable<JobResponse> jobs = domainJobs
            .Skip((query.Page - 1) * query.PageSize)
            .Take(query.PageSize)
            .Select(j => new JobResponse(j));

        return new Response()
        {
            Jobs = await jobs.ToListAsync(cancellationToken),
            Page = query.Page,
            PageSize = query.PageSize,
            TotalCount = totalCount,
        };
    }
}
