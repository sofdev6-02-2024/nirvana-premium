namespace Users.Jobs.Service.Api.Endpoints.Recruiters;

using Application.Recruiters.GetApplicantsByJobId;
using MediatR;
using SkDomain.Results;
using SkInfrastructure.Authorization;
using SkWeb.Api.Endpoints;
using SkWeb.Api.Infrastructure;

internal sealed class GetApplicantByJobId : IEndpoint
{
    public void MapEndpoint(IEndpointRouteBuilder app)
    {
        app.MapGet(
                "api/users-jobs/recruiters/{recruiterId:guid}/applicants/{jobId:guid}",
                async (
                    Guid recruiterId,
                    Guid jobId,
                    ISender sender,
                    CancellationToken cancellationToken,
                    string status = "All",
                    int page = 1,
                    int pageSize = 10
                ) =>
                {
                    GetApplicantsByJobIdQuery query =
                        new(recruiterId, jobId, status, page, pageSize);

                    Result<Response> result = await sender.Send(query, cancellationToken);

                    return result.Match(Results.Ok, CustomResults.Problem);
                }
            )
            .WithTags(Tags.Recruiters)
            .RequireAuthorization(Permissions.Recruiter);
    }
}
