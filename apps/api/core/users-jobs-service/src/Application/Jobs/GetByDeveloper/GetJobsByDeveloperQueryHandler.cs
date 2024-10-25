namespace Application.Jobs.GetByDeveloper;

using Domain.Developers;
using Domain.Enums;
using Domain.Jobs;
using Microsoft.EntityFrameworkCore;
using Persistent;
using SkApplication.Contracts;
using SkApplication.Responses;
using SkDomain.Results;

internal sealed class GetJobsQueryHandler(IApplicationDbContext context)
    : IQueryHandler<GetJobsByDeveloperQuery, PagedList<Response>>
{
    public async Task<Result<PagedList<Response>>> Handle(
        GetJobsByDeveloperQuery query,
        CancellationToken cancellationToken
    )
    {
        IQueryable<Job> domainJobs = context.Jobs;

        if (!await domainJobs.AnyAsync(cancellationToken))
        {
            return Result.Failure<PagedList<Response>>(JobErrors.NotJobsFound);
        }

        if (query.DeveloperId is null)
        {
            return await PagedList.CreateAsync(
                domainJobs.Where(job => job.Status == JobStatus.Open),
                new Converter(),
                query.Page,
                query.PageSize
            );
        }

        Guid developerId = Guid.Parse(query.DeveloperId);

        Developer? developer = await context
            .Developers.Include(developer => developer.Skills)
            .Include(developer => developer.Languages)
            .FirstOrDefaultAsync(developer => developer.Id == developerId, cancellationToken);

        if (developer is null)
        {
            return Result.Failure<PagedList<Response>>(DeveloperErrors.DeveloperNotFound);
        }

        return await PagedList.CreateAsync(
            developer.GetPreferredJobs(domainJobs),
            new Converter(),
            query.Page,
            query.PageSize
        );
    }
}
