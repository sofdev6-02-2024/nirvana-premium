namespace Application.Developer.PatchDescription;

using Domain.Entities.Developers;
using Microsoft.AspNetCore.OutputCaching;
using Microsoft.EntityFrameworkCore;
using Persistent;
using SkApplication.Contracts;
using SkDomain.Results;

internal sealed class PatchDescriptionCommandHandler(
    IApplicationDbContext context,
    IOutputCacheStore cacheStore
) : ICommandHandler<PatchDescriptionCommand>
{
    public async Task<Result> Handle(
        PatchDescriptionCommand request,
        CancellationToken cancellationToken
    )
    {
        Developer? developer = await context.Developers.FirstOrDefaultAsync(
            dev => dev.Id == request.DeveloperId,
            cancellationToken
        );

        if (developer is null)
        {
            return Result.Failure(DeveloperErrors.DeveloperNotFound(request.DeveloperId));
        }

        developer.Description = request.Description;
        developer.UpdatedAt = DateTime.UtcNow;

        context.Developers.Update(developer);

        await context.SaveChangesAsync(cancellationToken);

        await cacheStore.EvictByTagAsync(Tags.Developers, cancellationToken);

        return Result.Success();
    }
}
