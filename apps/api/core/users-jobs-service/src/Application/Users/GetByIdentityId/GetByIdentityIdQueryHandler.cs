namespace Application.Users.GetByIdentityId;

using Domain.Entities.Users;
using Microsoft.EntityFrameworkCore;
using Persistent;
using SkApplication.Contracts;
using SkDomain.Results;

internal sealed class GetByIdentityIdQueryHandler(IApplicationDbContext context)
    : IQueryHandler<GetByIdentityIdQuery, Response>
{
    public async Task<Result<Response>> Handle(
        GetByIdentityIdQuery request,
        CancellationToken cancellationToken
    )
    {
        User? user = await context
            .Users.Include(u => u.Developer)
            .Include(u => u.Recruiter)
            .FirstOrDefaultAsync(u => u.IdentityId == request.IdentityId, cancellationToken);

        if (user is null)
        {
            return Result.Failure<Response>(
                UserErrors.UserNotFoundByIdentityId(request.IdentityId)
            );
        }

        Response response = new Converter().Convert(user);

        return response;
    }
}
