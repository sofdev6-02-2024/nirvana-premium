namespace Users.Jobs.Service.Api.Endpoints.Jobs;

using Application.Jobs.GetByDeveloper;
using MediatR;
using SkApplication.Responses;
using SkDomain.Results;
using SkWeb.Api.Endpoints;
using SkWeb.Api.Infrastructure;

internal sealed class GetByDeveloper : IEndpoint
{
    public void MapEndpoint(IEndpointRouteBuilder app)
    {
        _ = app.MapGet(
                "api/users-jobs/jobs/developer/{developerId}",
                static async (
                    Guid developerId,
                    int page,
                    int pageSize,
                    ISender sender,
                    CancellationToken cancellationToken
                ) =>
                {
                    GetByDeveloperQuery query = new(developerId, page, pageSize);

                    Result<PagedList<Response>> result = await sender.Send(
                        query,
                        cancellationToken
                    );

                    return result.Match(Results.Ok, CustomResults.Problem);
                }
            )
            .WithTags(Tags.Jobs)
            .RequireAuthorization();
    }
}
