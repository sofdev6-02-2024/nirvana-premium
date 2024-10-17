namespace Application.Users.Register;

using Domain.Users;
using Microsoft.EntityFrameworkCore;
using Persistent;
using SkApplication.Authentication;
using SkApplication.Contracts;
using SkDomain.Extensions;
using SkDomain.Results;

internal sealed class RegisterUserCommandHandler(
    IApplicationDbContext context,
    IAuthenticationService authenticationService
) : ICommandHandler<RegisterUserCommand, Response>
{
    public async Task<Result<Response>> Handle(
        RegisterUserCommand command,
        CancellationToken cancellationToken
    )
    {
        bool isRoleValid = Enum.TryParse(command.Role, out UserRole role);

        if (!isRoleValid)
        {
            return Result.Failure<Response>(UserErrors.InvalidRole);
        }

        if (await context.Users.AnyAsync(u => u.Email == command.Email, cancellationToken))
        {
            return Result.Failure<Response>(UserErrors.EmailNotUnique);
        }

        Result<string> identityId = await authenticationService.RegisterAsync(
            command.Email,
            command.Password
        );

        if (identityId.IsFailure)
        {
            return Result.Failure<Response>(identityId.Error);
        }

        User user =
            new()
            {
                Id = Guid.NewGuid(),
                Email = command.Email,
                FirstName = command.FirstName,
                LastName = command.LastName,
                IdentityId = identityId.Value,
                Role = role,
            };

        user.Raise(new UserRegisteredDomainEvent(user.Id));

        _ = context.Users.Add(user);

        _ = await context.SaveChangesAsync(cancellationToken);

        return new Response(user.Id, user.Email, user.Role.GetDescription(), user.IdentityId);
    }
}
