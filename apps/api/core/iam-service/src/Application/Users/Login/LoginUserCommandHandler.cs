namespace Application.Users.Login;

using Domain.Users;
using Microsoft.EntityFrameworkCore;
using Persistent;
using SkApplication.Authentication;
using SkApplication.Contracts;
using SkDomain.Extensions;
using SkDomain.Results;

internal sealed class LoginUserCommandHandler(
    IApplicationDbContext context,
    IJwtProvider jwtProvider
) : ICommandHandler<LoginUserCommand, Response>
{
    public async Task<Result<Response>> Handle(
        LoginUserCommand command,
        CancellationToken cancellationToken
    )
    {
        User? user = await context
            .Users.AsNoTracking()
            .SingleOrDefaultAsync(u => u.Email == command.Email, cancellationToken);

        if (user is null)
        {
            return Result.Failure<Response>(AuthenticationErrors.InvalidCredentials);
        }

        Result<string> token = await jwtProvider.GetForCredentialsAsync(
            command.Email,
            command.Password
        );

        if (token.IsFailure)
        {
            return Result.Failure<Response>(token.Error);
        }

        return new Response(
            user.Id,
            user.Email,
            user.Role.GetDescription(),
            user.IdentityId,
            token.Value
        );
    }
}
