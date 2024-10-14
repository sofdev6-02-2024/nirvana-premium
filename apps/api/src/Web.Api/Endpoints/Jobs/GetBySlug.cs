namespace Web.Api.Endpoints.Jobs;

using Application.Core.Jobs.GetBySlug;
using Infrastructure;
using MediatR;
using SharedKernel.Results;

internal sealed class GetBySlug : IEndpoint
{
    public void MapEndpoint(IEndpointRouteBuilder app)
    {
        app.MapGet(
                "jobs/{jobSlug}",
                async (string jobSlug, ISender sender, CancellationToken cancellationToken) =>
                {
                    GetJobBySlugQuery query = new(jobSlug);

                    Result<JobResponse> result = await sender.Send(query, cancellationToken);

                    return result.Match(Results.Ok, CustomResults.Problem);
                }
            )
            .WithTags(Tags.Jobs);
    }
}
