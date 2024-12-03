namespace Application.Jobs.GetApplicantByDeveloperId;

using Domain.Entities.Developers;
using Domain.Entities.Jobs;
using Microsoft.EntityFrameworkCore;
using Persistent;
using SkApplication.Contracts;
using SkDomain.Results;

internal sealed class GetApplicantByDeveloperIdQueryHandler(IApplicationDbContext context)
    : IQueryHandler<GetApplicantByDeveloperIdQuery, Response>
{
    public async Task<Result<Response>> Handle(
        GetApplicantByDeveloperIdQuery request,
        CancellationToken cancellationToken
    )
    {
        Job? job = await context.Jobs
            .AsNoTracking()
            .FirstOrDefaultAsync(
                job => job.Id == request.JobId, cancellationToken);

        if (job is null)
        {
            return Result.Failure<Response>(JobErrors.JobNotFound(request.JobId));
        }

        Developer? developer = await context.Developers
            .AsNoTracking()
            .FirstOrDefaultAsync(
                developer => developer.Id == request.DeveloperId, cancellationToken);

        if (developer is null)
        {
            return Result.Failure<Response>(DeveloperErrors.DeveloperNotFound(request.DeveloperId));
        }

        bool applied = await context.JobDevelopers
            .AnyAsync(
                jobDeveloper => jobDeveloper.DeveloperId == request.DeveloperId &&
                                jobDeveloper.JobId == request.JobId, cancellationToken);

        return new Response() { Apply = applied };
    }
}
