namespace Users.Jobs.Service.Api.Endpoints.Jobs;

using Application.Jobs.GetBySlug;
using MediatR;
using SkDomain.Results;
using SkWeb.Api.Endpoints;
using SkWeb.Api.Infrastructure;

internal sealed class GetBySlug : IEndpoint
{
    public void MapEndpoint(IEndpointRouteBuilder app)
    {
        _ = app.MapGet(
                "api/users-jobs/jobs/{jobSlug}",
                static async (
                    string jobSlug,
                    ISender sender,
                    CancellationToken cancellationToken
                ) =>
                {
                    GetJobBySlugQuery query = new(jobSlug);

                    Result<Response> result = await sender.Send(query, cancellationToken);

                    return result.Match(Results.Ok, CustomResults.Problem);
                }
            )
            .WithTags(Tags.Jobs);
    }
}
