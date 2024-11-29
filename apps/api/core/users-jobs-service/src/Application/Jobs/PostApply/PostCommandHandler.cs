namespace Application.Jobs.PostApply;

using Domain.Entities.Developers;
using Domain.Entities.Jobs;
using Domain.Joins.JobDevelopers;
using Microsoft.AspNetCore.OutputCaching;
using Microsoft.EntityFrameworkCore;
using Persistent;
using SkApplication.Contracts;
using SkDomain.Results;

internal sealed class PostCommandHandler(
    IApplicationDbContext context,
    IOutputCacheStore cacheStore
) : ICommandHandler<PostCommand>
{
    public async Task<Result> Handle(PostCommand request, CancellationToken cancellationToken)
    {
        Job? job = await context
            .Jobs.Include(j => j.JobDevelopers)
            .FirstOrDefaultAsync(job => job.Id == request.JobId, cancellationToken);

        if (job is null)
        {
            return Result.Failure(JobErrors.JobNotFound(request.JobId));
        }

        Developer? developer = await context.Developers.FirstOrDefaultAsync(
            developer => developer.Id == request.DeveloperId,
            cancellationToken
        );

        if (developer is null)
        {
            return Result.Failure(DeveloperErrors.DeveloperNotFound(request.DeveloperId));
        }

        if (job.JobDevelopers.Any(jd => jd.DeveloperId == request.DeveloperId))
        {
            return Result.Failure(
                JobDeveloperErrors.DeveloperAlreadyApplied(request.DeveloperId, request.JobId)
            );
        }

        job.JobDevelopers.Add(new Converter().Convert(request));

        context.Jobs.Update(job);

        await context.SaveChangesAsync(cancellationToken);

        await cacheStore.EvictByTagAsync(Tags.Jobs, cancellationToken);

        return Result.Success();
    }
}
