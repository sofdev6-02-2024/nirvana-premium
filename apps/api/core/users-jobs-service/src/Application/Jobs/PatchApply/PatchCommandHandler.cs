namespace Application.Jobs.PatchApply;

using Domain.Entities.Developers;
using Domain.Entities.Jobs;
using Domain.Joins.JobDevelopers;
using Persistent;
using Microsoft.AspNetCore.OutputCaching;
using Microsoft.EntityFrameworkCore;
using SkApplication.Contracts;
using SkDomain.Results;

internal sealed class PatchCommandHandler(
    IApplicationDbContext context,
    IOutputCacheStore cacheStore
) : ICommandHandler<PatchCommand>
{
    public async Task<Result> Handle(PatchCommand request, CancellationToken cancellationToken)
    {
        Job? job =
            await context.Jobs.FirstOrDefaultAsync(job => job.Id == request.JobId,
                cancellationToken);

        if (job is null) return Result.Failure(JobErrors.JobNotFound(request.JobId));

        Developer? developer =
            await context.Developers.FirstOrDefaultAsync(
                developer => developer.Id == request.DeveloperId,
                cancellationToken);

        if (developer is null)
            return Result.Failure(DeveloperErrors.DeveloperNotFound(request.DeveloperId));


        JobDeveloper jobDeveloper = new Converter().Convert(request);

        JobDeveloper? existingJobDeveloper =
            await context.JobDevelopers.FirstOrDefaultAsync(
                jd => jd.JobId == jobDeveloper.JobId && jd.DeveloperId == jobDeveloper.DeveloperId,
                cancellationToken);

        if (existingJobDeveloper is null)
            return Result.Failure(
                JobErrors.JobDeveloperNotFound(jobDeveloper.JobId, jobDeveloper.DeveloperId));

        jobDeveloper.UpdatedAt = DateTime.UtcNow;

        context.JobDevelopers.Update(jobDeveloper);

        await context.SaveChangesAsync(cancellationToken);

        await cacheStore.EvictByTagAsync(Tags.Jobs, cancellationToken);

        return Result.Success();
    }
}
