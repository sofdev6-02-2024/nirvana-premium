namespace Application.Jobs.PatchApply;

using Domain.Entities.Developers;
using Domain.Entities.Jobs;
using Domain.Enums;
using Domain.Joins.JobDevelopers;
using Microsoft.AspNetCore.OutputCaching;
using Microsoft.EntityFrameworkCore;
using Persistent;
using SkApplication.Contracts;
using SkDomain.Results;

internal sealed class PatchCommandHandler(
    IApplicationDbContext context,
    IOutputCacheStore cacheStore
) : ICommandHandler<PatchCommand>
{
    public async Task<Result> Handle(PatchCommand request, CancellationToken cancellationToken)
    {
        Job? job = await context.Jobs.FirstOrDefaultAsync(
            job => job.Id == request.JobId,
            cancellationToken
        );

        if (job is null)
            return Result.Failure(JobErrors.JobNotFound(request.JobId));

        Developer? developer = await context.Developers.FirstOrDefaultAsync(
            developer => developer.Id == request.DeveloperId,
            cancellationToken
        );

        if (developer is null)
            return Result.Failure(DeveloperErrors.DeveloperNotFound(request.DeveloperId));

        JobDeveloper? jobDeveloper = await context.JobDevelopers.FirstOrDefaultAsync(
            jd => jd.JobId == request.JobId && jd.DeveloperId == request.DeveloperId,
            cancellationToken
        );

        if (jobDeveloper is null)
            return Result.Failure(
                JobErrors.JobDeveloperNotFound(request.JobId, request.DeveloperId)
            );

        ApplicantStatus newStatus = Enum.Parse<ApplicantStatus>(request.Status);

        jobDeveloper.Status = newStatus;
        jobDeveloper.UpdatedAt = DateTime.UtcNow;

        context.JobDevelopers.Update(jobDeveloper);

        await context.SaveChangesAsync(cancellationToken);

        await cacheStore.EvictByTagAsync(Tags.Jobs, cancellationToken);

        return Result.Success();
    }
}
