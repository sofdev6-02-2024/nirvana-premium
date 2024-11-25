namespace Application.Recruiters.Post;

using Domain.Entities.Recruiters;
using Domain.Entities.Users;
using Microsoft.EntityFrameworkCore;
using Persistent;
using SkApplication.Contracts;
using SkDomain.Results;

internal sealed class PostCommandHandler(IApplicationDbContext context)
    : ICommandHandler<PostCommand>
{
    public async Task<Result> Handle(PostCommand request, CancellationToken cancellationToken)
    {
        bool repeatedCompanyName = await context.Recruiters.AnyAsync(
            x => x.Name == request.Name,
            cancellationToken
        );

        if (repeatedCompanyName)
        {
            return Result.Failure(RecruiterErrors.RepeatedName(request.Name));
        }

        User? user = await context
            .Users.AsNoTracking()
            .FirstOrDefaultAsync(x => x.Id == request.UserId, cancellationToken);

        if (user is null)
        {
            return Result.Failure(UserErrors.UserNotFound(request.UserId));
        }

        Recruiter recruiter = new Converter().Convert(request);

        await context.Recruiters.AddAsync(recruiter, cancellationToken);

        await context.SaveChangesAsync(cancellationToken);

        return Result.Success();
    }
}
