namespace Users.Jobs.Service.Api.Endpoints.Recruiters;

using Application.Recruiters.GetJobsById;
using MediatR;
using SkApplication.Responses;
using SkDomain.Results;
using SkWeb.Api.Endpoints;
using SkWeb.Api.Infrastructure;

internal sealed class GetJobsById : IEndpoint
{
    public void MapEndpoint(IEndpointRouteBuilder app)
    {
        _ = app.MapGet(
                "api/users-jobs/recruiters/{recruiterId:guid}/jobs",
                static async (
                    Guid recruiterId,
                    ISender sender,
                    CancellationToken cancellationToken,
                    int page = 1,
                    int pageSize = 10
                ) =>
                {
                    GetJobsByIdQuery query = new(recruiterId, page, pageSize);

                    Result<PagedList<Response>> result = await sender.Send(
                        query,
                        cancellationToken
                    );

                    return result.Match(Results.Ok, CustomResults.Problem);
                }
            )
            .WithTags(Tags.Recruiters);
    }
}
