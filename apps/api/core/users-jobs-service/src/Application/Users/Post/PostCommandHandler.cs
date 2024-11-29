namespace Application.Users.Post;

using Domain.Entities.Users;
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
        bool repeatedIdentityId = await context.Users.AnyAsync(
            user => user.IdentityId == request.IdentityId,
            cancellationToken
        );

        if (repeatedIdentityId)
        {
            return Result.Failure(UserErrors.UserRepeatedIdentityId(request.IdentityId));
        }

        bool repeatedEmail = await context.Users.AnyAsync(
            user => user.Email == request.Email,
            cancellationToken
        );

        if (repeatedEmail)
        {
            return Result.Failure(UserErrors.UserRepeatedEmail(request.Email));
        }

        User user = new Converter().Convert(request);

        await context.Users.AddAsync(user, cancellationToken);

        await context.SaveChangesAsync(cancellationToken);

        await cacheStore.EvictByTagAsync(Tags.Users, cancellationToken);

        return Result.Success();
    }
}
