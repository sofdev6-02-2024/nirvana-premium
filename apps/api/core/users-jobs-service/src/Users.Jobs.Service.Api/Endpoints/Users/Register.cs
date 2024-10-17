namespace Users.Jobs.Service.Api.Endpoints.Users;

using Application.Users.Register;
using MediatR;
using SkDomain.Results;
using SkWeb.Api.Endpoints;
using SkWeb.Api.Infrastructure;

internal sealed class Register : IEndpoint
{
    public sealed record Request(string Email, string FirstName, string LastName, string Password);

    public void MapEndpoint(IEndpointRouteBuilder app)
    {
        _ = app.MapPost(
                "users/register",
                static async (
                    Request request,
                    ISender sender,
                    CancellationToken cancellationToken
                ) =>
                {
                    RegisterUserCommand command =
                        new(request.Email, request.FirstName, request.LastName, request.Password);

                    Result<Response> result = await sender.Send(command, cancellationToken);

                    return result.Match(Results.Ok, CustomResults.Problem);
                }
            )
            .WithTags(Tags.Users);
    }
}
