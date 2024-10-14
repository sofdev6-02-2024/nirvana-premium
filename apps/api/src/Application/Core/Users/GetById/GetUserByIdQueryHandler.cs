namespace Application.Core.Users.GetById;

using Contracts;
using Domain.Users.Errors;
using Microsoft.EntityFrameworkCore;
using Persistent;
using SharedKernel.Results;

internal sealed class GetUserByIdQueryHandler(IApplicationDbContext context)
    : IQueryHandler<GetUserByIdQuery, UserResponse>
{
    public async Task<Result<UserResponse>> Handle(
        GetUserByIdQuery query,
        CancellationToken cancellationToken
    )
    {
        UserResponse? user = await context
            .Users.Where(u => u.Id == query.UserId)
            .Select(u => new UserResponse(u.Id, u.Email, u.FirstName, u.LastName))
            .SingleOrDefaultAsync(cancellationToken);

        if (user is null)
        {
            return Result.Failure<UserResponse>(UserErrors.NotFound(query.UserId));
        }

        return user;
    }
}
