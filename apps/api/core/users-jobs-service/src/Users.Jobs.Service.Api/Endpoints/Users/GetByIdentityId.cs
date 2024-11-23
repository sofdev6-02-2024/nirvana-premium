namespace Users.Jobs.Service.Api.Endpoints.Users;

using Application.Users.GetByIdentityId;
using MediatR;
using SkDomain.Results;
using SkWeb.Api.Endpoints;
using SkWeb.Api.Infrastructure;

internal sealed class GetByIdentityId : IEndpoint
{
    public void MapEndpoint(IEndpointRouteBuilder app)
    {
        _ = app.MapGet(
                "api/users-jobs/users/{identityId}",
                static async (
                    string identityId,
                    ISender sender,
                    CancellationToken cancellationToken
                ) =>
                {
                    GetByIdentityIdQuery query = new(identityId);

                    Result<Response> result = await sender.Send(query, cancellationToken);

                    return result.Match(Results.Ok, CustomResults.Problem);
                }
            )
            .WithTags(Tags.Users)
            .RequireAuthorization();
    }
}
