namespace Application.Jobs.PostApply;

using Domain.Entities.Developers;
using Domain.Entities.Jobs;
using Domain.Joins.JobDevelopers;
using Persistent;
using Microsoft.EntityFrameworkCore;
using SkApplication.Contracts;
using SkDomain.Results;

internal sealed class PostCommandHandler(IApplicationDbContext context)
    : ICommandHandler<PostCommand>
{
    public async Task<Result> Handle(PostCommand request, CancellationToken cancellationToken)
    {
        Job? job = await context.Jobs.FirstOrDefaultAsync(
            job => job.Id == request.JobId,
            cancellationToken
        );

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

        JobDeveloper jobDeveloper = new Converter().Convert(request);

        await context.JobDevelopers.AddAsync(jobDeveloper, cancellationToken);

        await context.SaveChangesAsync(cancellationToken);

        return Result.Success();
    }
}
