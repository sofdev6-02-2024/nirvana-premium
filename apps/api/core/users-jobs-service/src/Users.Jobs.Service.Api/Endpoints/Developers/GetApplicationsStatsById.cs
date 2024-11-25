namespace Users.Jobs.Service.Api.Endpoints.Developers;

using Application.Developer.GetApplicationsStatsById;
using MediatR;
using SkDomain.Results;
using SkInfrastructure.Authorization;
using SkWeb.Api.Endpoints;
using SkWeb.Api.Infrastructure;

internal sealed class GetApplicationsStatsById : IEndpoint
{
    public void MapEndpoint(IEndpointRouteBuilder app)
    {
        app.MapGet(
                "api/users-jobs/developers/{developerId:guid}/applications/stats",
                async (Guid developerId, ISender sender, CancellationToken cancellationToken) =>
                {
                    GetApplicationsStatsByIdQuery query = new(developerId);

                    Result<Response> result = await sender.Send(query, cancellationToken);

                    return result.Match(Results.Ok, CustomResults.Problem);
                }
            )
            .WithTags(Tags.Developers)
            .RequireAuthorization(Permissions.Developer);
    }
}
