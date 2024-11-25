namespace Users.Jobs.Service.Api.Endpoints.Recruiters;

using Application.Recruiters.PatchDescription;
using MediatR;
using SkDomain.Results;
using SkInfrastructure.Authorization;
using SkWeb.Api.Endpoints;
using SkWeb.Api.Infrastructure;

internal sealed class PatchDescription : IEndpoint
{
    public void MapEndpoint(IEndpointRouteBuilder app)
    {
        _ = app.MapPatch(
                "api/users-jobs/recruiters/{recruiterId:guid}/about",
                static async (
                    Guid recruiterId,
                    PatchDescriptionCommand command,
                    ISender sender,
                    CancellationToken cancellationToken
                ) =>
                {
                    command = command with { RecruiterId = recruiterId };
                    Result result = await sender.Send(command, cancellationToken);

                    return result.Match(Results.Created, CustomResults.Problem);
                }
            )
            .WithTags(Tags.Recruiters)
            .RequireAuthorization(Permissions.Recruiter);
    }
}
