namespace Application.Core.Users.Login;

using Authentication;
using Contracts;
using Domain.Users;
using Domain.Users.Errors;
using Microsoft.EntityFrameworkCore;
using Persistent;
using SharedKernel.Results;

internal sealed class LoginUserCommandHandler(
    IApplicationDbContext context,
    IJwtProvider jwtProvider
) : ICommandHandler<LoginUserCommand, UserResponse>
{
    public async Task<Result<UserResponse>> Handle(
        LoginUserCommand command,
        CancellationToken cancellationToken
    )
    {
        User? user = await context
            .Users.AsNoTracking()
            .SingleOrDefaultAsync(u => u.Email == command.Email, cancellationToken);

        if (user is null)
        {
            return Result.Failure<UserResponse>(UserErrors.NotFoundByEmail);
        }

        Result<string> token = await jwtProvider.GetForCredentialsAsync(
            command.Email,
            command.Password
        );

        if (token.IsFailure)
        {
            return Result.Failure<UserResponse>(token.Error);
        }

        return new UserResponse(user.Id, token.Value, user.IdentityId);
    }
}
