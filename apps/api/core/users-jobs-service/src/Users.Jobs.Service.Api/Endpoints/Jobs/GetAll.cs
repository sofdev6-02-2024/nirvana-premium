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
                "jobs",
                static async (ISender sender, CancellationToken cancellationToken) =>
                {
                    GetJobsQuery query = new();

                    Result<IList<Response>> result = await sender.Send(query, cancellationToken);

                    return result.Match(Results.Ok, CustomResults.Problem);
                }
            )
            .WithTags(Tags.Jobs);
    }
}
