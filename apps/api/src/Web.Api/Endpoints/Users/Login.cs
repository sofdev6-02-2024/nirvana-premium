namespace Web.Api.Endpoints.Users;

using Application.Core.Users.Login;
using Infrastructure;
using MediatR;
using SharedKernel.Results;

internal sealed class Login : IEndpoint
{
    public sealed record Request(string Email, string Password);

    public void MapEndpoint(IEndpointRouteBuilder app)
    {
        app.MapPost(
                "users/login",
                async (Request request, ISender sender, CancellationToken cancellationToken) =>
                {
                    LoginUserCommand command = new(request.Email, request.Password);

                    Result<UserResponse> result = await sender.Send(command, cancellationToken);

                    return result.Match(Results.Ok, CustomResults.Problem);
                }
            )
            .WithTags(Tags.Users);
    }
}
