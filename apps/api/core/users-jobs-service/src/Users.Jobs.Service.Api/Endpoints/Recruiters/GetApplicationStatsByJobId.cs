namespace Users.Jobs.Service.Api.Endpoints.Recruiters;

using Application;
using Application.Recruiters.GetApplicationsStatsByJobId;
using MediatR;
using SkDomain.Results;
using SkInfrastructure.Authorization;
using SkWeb.Api.Endpoints;
using SkWeb.Api.Extensions;
using SkWeb.Api.Infrastructure;

internal sealed class GetApplicationStatsByJobId : IEndpoint
{
    public void MapEndpoint(IEndpointRouteBuilder app)
    {
        app.MapGet(
                "api/users-jobs/recruiters/{recruiterId:guid}/applicants/{jobId:guid}/stats",
                async (
                    Guid recruiterId,
                    Guid jobId,
                    ISender sender,
                    CancellationToken cancellationToken
                ) =>
                {
                    GetApplicationsStatsByJobIdQuery query = new(recruiterId, jobId);

                    Result<Response> result = await sender.Send(query, cancellationToken);

                    return result.Match(Results.Ok, CustomResults.Problem);
                }
            )
            .WithTags(Tags.Recruiters)
            .RequireAuthorization(Permissions.Recruiter)
            .AddCacheWithAuthorization(Tags.Recruiters);
    }
}
