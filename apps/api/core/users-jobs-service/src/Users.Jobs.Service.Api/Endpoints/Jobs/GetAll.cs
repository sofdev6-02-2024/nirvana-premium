namespace Users.Jobs.Service.Api.Endpoints.Jobs;

using Application.Jobs.Get;
using MediatR;
using SkDomain.Results;
using SkWeb.Api.Endpoints;
using SkWeb.Api.Infrastructure;

internal sealed class GetAll : IEndpoint
{
    public void MapEndpoint(IEndpointRouteBuilder app)
    {
        _ = app.MapGet(
                "api/users-jobs/jobs",
                static async (
                    int page,
                    int pageSize,
                    ISender sender,
                    CancellationToken cancellationToken
                ) =>
                {
                    GetJobsQuery query = new(page, pageSize);

                    Result<Response> result = await sender.Send(query, cancellationToken);

                    return result.Match(Results.Ok, CustomResults.Problem);
                }
            )
            .WithTags(Tags.Jobs);
    }
}
