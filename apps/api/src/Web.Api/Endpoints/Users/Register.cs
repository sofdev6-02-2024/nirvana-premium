namespace Web.Api.Endpoints.Users;

using Application.Core.Users.Register;
using Infrastructure;
using MediatR;
using SharedKernel.Results;

internal sealed class Register : IEndpoint
{
    public sealed record Request(string Email, string FirstName, string LastName, string Password);

    public void MapEndpoint(IEndpointRouteBuilder app)
    {
        app.MapPost(
                "users/register",
                async (Request request, ISender sender, CancellationToken cancellationToken) =>
                {
                    RegisterUserCommand command =
                        new(request.Email, request.FirstName, request.LastName, request.Password);

                    Result<UserResponse> result = await sender.Send(command, cancellationToken);

                    return result.Match(Results.Ok, CustomResults.Problem);
                }
            )
            .WithTags(Tags.Users);
    }
}