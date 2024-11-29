namespace Users.Jobs.Service.Api.Endpoints.Users;

using Application;
using Application.Users.Post;
using MediatR;
using SkDomain.Results;
using SkWeb.Api.Endpoints;
using SkWeb.Api.Infrastructure;

internal sealed class Post : IEndpoint
{
    public void MapEndpoint(IEndpointRouteBuilder app)
    {
        _ = app.MapPost(
                "api/users-jobs/users",
                static async (
                    PostCommand command,
                    ISender sender,
                    CancellationToken cancellationToken
                ) =>
                {
                    Result result = await sender.Send(command, cancellationToken);

                    return result.Match(Results.Created, CustomResults.Problem);
                }
            )
            .WithTags(Tags.Users);
    }
}
