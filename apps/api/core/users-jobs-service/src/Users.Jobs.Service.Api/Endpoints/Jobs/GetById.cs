namespace Users.Jobs.Service.Api.Endpoints.Jobs;

using Application.Jobs.GetById;
using MediatR;
using SkDomain.Results;
using SkWeb.Api.Endpoints;
using SkWeb.Api.Infrastructure;

internal sealed class GetById : IEndpoint
{
    public void MapEndpoint(IEndpointRouteBuilder app)
    {
        _ = app.MapGet(
                "api/users-jobs/jobs/{jobId:guid}",
                static async (Guid jobId, ISender sender, CancellationToken cancellationToken) =>
                {
                    GetByIdQuery query = new(jobId);

                    Result<Response> result = await sender.Send(query, cancellationToken);

                    return result.Match(Results.Ok, CustomResults.Problem);
                }
            )
            .WithTags(Tags.Jobs);
    }
}
