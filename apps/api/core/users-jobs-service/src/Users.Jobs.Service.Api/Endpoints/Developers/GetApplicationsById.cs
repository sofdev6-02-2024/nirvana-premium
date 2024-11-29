namespace Users.Jobs.Service.Api.Endpoints.Developers;

using Application;
using Application.Developer.GetApplicationsById;
using MediatR;
using SkApplication.Responses;
using SkDomain.Results;
using SkInfrastructure.Authorization;
using SkWeb.Api.Endpoints;
using SkWeb.Api.Extensions;
using SkWeb.Api.Infrastructure;

internal sealed class GetApplicationsById : IEndpoint
{
    public void MapEndpoint(IEndpointRouteBuilder app)
    {
        app.MapGet(
                "api/users-jobs/developers/{developerId:guid}/applications",
                async (
                    Guid developerId,
                    ISender sender,
                    CancellationToken cancellationToken,
                    string status = "All",
                    int page = 1,
                    int pageSize = 10
                ) =>
                {
                    GetApplicationsByIdQuery query = new(developerId, status, page, pageSize);

                    Result<PagedList<Response>> result = await sender.Send(
                        query,
                        cancellationToken
                    );

                    return result.Match(Results.Ok, CustomResults.Problem);
                }
            )
            .WithTags(Tags.Developers)
            .RequireAuthorization(Permissions.Developer)
            .AddCacheWithAuthorization(Tags.Developers);
    }
}
