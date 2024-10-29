namespace Users.Jobs.Service.Api.Endpoints.Jobs;

using Application.Jobs.GetByRecruiter;
using MediatR;
using SkApplication.Responses;
using SkDomain.Results;
using SkWeb.Api.Endpoints;
using SkWeb.Api.Infrastructure;

internal sealed class GetByRecruiter : IEndpoint
{
    public void MapEndpoint(IEndpointRouteBuilder app)
    {
        _ = app.MapGet(
                "api/users-jobs/jobs/recruiter/{recruiterId}",
                static async (
                    Guid recruiterId,
                    int page,
                    int pageSize,
                    ISender sender,
                    CancellationToken cancellationToken
                ) =>
                {
                    GetByRecruiterQuery query = new(recruiterId, page, pageSize);

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
