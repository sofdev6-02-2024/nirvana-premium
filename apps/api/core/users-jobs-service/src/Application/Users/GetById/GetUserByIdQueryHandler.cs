namespace Application.Users.GetById;

using Domain.Users;
using Microsoft.EntityFrameworkCore;
using Persistent;
using SkApplication.Contracts;
using SkDomain.Results;

internal sealed class GetUserByIdQueryHandler(IApplicationDbContext context)
    : IQueryHandler<GetUserByIdQuery, Response>
{
    public async Task<Result<Response>> Handle(
        GetUserByIdQuery query,
        CancellationToken cancellationToken
    )
    {
        Response? user = await context
            .Users.Where(u => u.Id == query.UserId)
            .Select(u => new Response(u.Id, u.Email, u.FirstName, u.LastName))
            .SingleOrDefaultAsync(cancellationToken);

        if (user is null)
        {
            return Result.Failure<Response>(UserErrors.NotFound(query.UserId));
        }

        return user;
    }
}
