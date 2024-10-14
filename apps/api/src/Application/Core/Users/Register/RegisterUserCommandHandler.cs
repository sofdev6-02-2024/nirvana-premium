namespace Application.Core.Users.Register;

using Authentication;
using Contracts;
using Domain.Users;
using Domain.Users.Errors;
using Domain.Users.Events;
using Microsoft.EntityFrameworkCore;
using Persistent;
using SharedKernel.Results;

internal sealed class RegisterUserCommandHandler(
    IApplicationDbContext context,
    IAuthenticationService authenticationService
) : ICommandHandler<RegisterUserCommand, UserResponse>
{
    public async Task<Result<UserResponse>> Handle(
        RegisterUserCommand command,
        CancellationToken cancellationToken
    )
    {
        if (await context.Users.AnyAsync(u => u.Email == command.Email, cancellationToken))
        {
            return Result.Failure<UserResponse>(UserErrors.EmailNotUnique);
        }

        Result<string> identityId = await authenticationService.RegisterAsync(
            command.Email,
            command.Password
        );

        if (identityId.IsFailure)
        {
            return Result.Failure<UserResponse>(identityId.Error);
        }

        User user =
            new()
            {
                Id = Guid.NewGuid(),
                Email = command.Email,
                FirstName = command.FirstName,
                LastName = command.LastName,
                IdentityId = identityId.Value,
            };

        user.Raise(new UserRegisteredDomainEvent(user.Id));

        context.Users.Add(user);

        await context.SaveChangesAsync(cancellationToken);

        return new UserResponse(user.Id, user.Email, user.IdentityId);
    }
}
