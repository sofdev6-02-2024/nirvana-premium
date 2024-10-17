namespace Users.Jobs.Service.Api.Endpoints.Users;

using Application.Users.GetById;
using MediatR;
using SkDomain.Results;
using SkWeb.Api.Endpoints;
using SkWeb.Api.Infrastructure;

internal sealed class GetById : IEndpoint
{
    public void MapEndpoint(IEndpointRouteBuilder app)
    {
        _ = app.MapGet(
                "users/{userId}",
                static async (Guid userId, ISender sender, CancellationToken cancellationToken) =>
                {
                    GetUserByIdQuery query = new(userId);

                    Result<Response> result = await sender.Send(query, cancellationToken);

                    return result.Match(Results.Ok, CustomResults.Problem);
                }
            )
            .WithTags(Tags.Users)
            .RequireAuthorization();
    }
}
