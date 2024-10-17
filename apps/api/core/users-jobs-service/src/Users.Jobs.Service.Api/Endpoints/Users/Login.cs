namespace Users.Jobs.Service.Api.Endpoints.Users;

using Application.Users.Login;
using MediatR;
using SkDomain.Results;
using SkWeb.Api.Endpoints;
using SkWeb.Api.Infrastructure;

internal sealed class Login : IEndpoint
{
    public sealed record Request(string Email, string Password);

    public void MapEndpoint(IEndpointRouteBuilder app)
    {
        _ = app.MapPost(
                "users/login",
                static async (
                    Request request,
                    ISender sender,
                    CancellationToken cancellationToken
                ) =>
                {
                    LoginUserCommand command = new(request.Email, request.Password);

                    Result<Response> result = await sender.Send(command, cancellationToken);

                    return result.Match(Results.Ok, CustomResults.Problem);
                }
            )
            .WithTags(Tags.Users);
    }
}
