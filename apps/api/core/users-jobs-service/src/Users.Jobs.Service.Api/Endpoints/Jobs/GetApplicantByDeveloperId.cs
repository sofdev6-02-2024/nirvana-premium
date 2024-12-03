namespace Users.Jobs.Service.Api.Endpoints.Jobs;

using Application;
using Application.Jobs.GetApplicantByDeveloperId;
using MediatR;
using SkDomain.Results;
using SkInfrastructure.Authorization;
using SkWeb.Api.Endpoints;
using SkWeb.Api.Extensions;
using SkWeb.Api.Infrastructure;

internal sealed class GetApplicantByDeveloperId : IEndpoint
{
    public void MapEndpoint(IEndpointRouteBuilder app)
    {
        app.MapGet(
                "api/users-jobs/jobs/{jobId:guid}/developer/{developerId:guid}",
                async (
                    Guid developerId,
                    Guid jobId,
                    ISender sender,
                    CancellationToken cancellationToken
                ) =>
                {
                    GetApplicantByDeveloperIdQuery query =
                        new(developerId, jobId);

                    Result<Response> result = await sender.Send(query, cancellationToken);

                    return result.Match(Results.Ok, CustomResults.Problem);
                }
            )
            .WithTags(Tags.Jobs)
            .RequireAuthorization(Permissions.Developer)
            .AddCacheWithAuthorization(Tags.Developers);
    }
}
