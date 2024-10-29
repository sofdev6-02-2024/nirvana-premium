namespace Application.Jobs.GetByDeveloper;

using Domain.Developers;
using Domain.Enums;
using Domain.Jobs;
using Microsoft.EntityFrameworkCore;
using Persistent;
using SkApplication.Contracts;
using SkApplication.Responses;
using SkDomain.Results;

internal sealed class GetByDeveloperQueryHandler(IApplicationDbContext context)
    : IQueryHandler<GetByDeveloperQuery, PagedList<Response>>
{
    public async Task<Result<PagedList<Response>>> Handle(
        GetByDeveloperQuery query,
        CancellationToken cancellationToken
    )
    {
        IQueryable<Job> jobs = context
            .Jobs.Where(job => job.Status == JobStatus.Open)
            .Include(static job => job.Recruiter)
            .Include(static job => job.Skills)
            .Include(static job => job.Languages);

        if (!await jobs.AnyAsync(cancellationToken))
        {
            return Result.Failure<PagedList<Response>>(JobErrors.NotJobsFound);
        }

        Developer? developer = await context
            .Developers.Include(developer => developer.Skills)
            .Include(developer => developer.Languages)
            .FirstOrDefaultAsync(developer => developer.Id == query.DeveloperId, cancellationToken);

        if (developer is null)
        {
            return Result.Failure<PagedList<Response>>(
                DeveloperErrors.DeveloperNotFound(query.DeveloperId)
            );
        }

        return await PagedList.CreateAsync(
            developer.GetPreferredJobs(jobs),
            new Converter(),
            query.Page,
            query.PageSize
        );
    }
}
