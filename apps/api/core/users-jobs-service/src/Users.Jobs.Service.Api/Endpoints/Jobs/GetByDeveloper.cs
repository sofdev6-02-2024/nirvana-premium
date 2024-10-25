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
                "api/users-jobs/jobs/{developerId:guid}",
                static async (
                    int page,
                    int pageSize,
                    string developerId,
                    ISender sender,
                    CancellationToken cancellationToken
                ) =>
                {
                    GetJobsByDeveloperQuery query = new(page, pageSize, developerId);

                    Result<PagedList<Response>> result = await sender.Send(
                        query,
                        cancellationToken
                    );

                    return result.Match(Results.Ok, CustomResults.Problem);
                }
            )
            .WithTags(Tags.Jobs);
    }
}
