namespace Iam.Service.Api.Endpoints.Users;

using Application.Users.Register;
using MediatR;
using SkDomain.Results;
using SkWeb.Api.Endpoints;
using SkWeb.Api.Infrastructure;

internal sealed class Register : IEndpoint
{
    public sealed record Request(
        string Email,
        string FirstName,
        string LastName,
        string Role,
        string Password,
        string ConfirmPassword
    );

    public void MapEndpoint(IEndpointRouteBuilder app)
    {
        _ = app.MapPost(
                "/api/auth/register",
                static async (
                    Request request,
                    ISender sender,
                    CancellationToken cancellationToken
                ) =>
                {
                    RegisterUserCommand command =
                        new(
                            request.Email,
                            request.FirstName,
                            request.LastName,
                            request.Role,
                            request.Password,
                            request.ConfirmPassword
                        );

                    Result<Response> result = await sender.Send(command, cancellationToken);

                    return result.Match(Results.Ok, CustomResults.Problem);
                }
            )
            .WithTags(Tags.Users);
    }
}
