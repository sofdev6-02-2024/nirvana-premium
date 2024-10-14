namespace Web.Api.Endpoints.Jobs;

using Application.Core.Jobs.GetAll;
using Infrastructure;
using MediatR;
using SharedKernel.Results;

internal sealed class GetAll : IEndpoint
{
    public void MapEndpoint(IEndpointRouteBuilder app)
    {
        app.MapGet(
                "jobs",
                async (ISender sender, CancellationToken cancellationToken) =>
                {
                    GetAllJobsQuery query = new();

                    Result<IList<JobResponse>> result = await sender.Send(query, cancellationToken);

                    return result.Match(Results.Ok, CustomResults.Problem);
                }
            )
            .WithTags(Tags.Jobs);
    }
}
