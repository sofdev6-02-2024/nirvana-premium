namespace Users.Jobs.Service.Api.Endpoints.Developers;

using Application.Developer.PatchDescription;
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
                "api/users-jobs/developers/{developerId:guid}/about",
                static async (
                    Guid developerId,
                    PatchDescriptionCommand command,
                    ISender sender,
                    CancellationToken cancellationToken
                ) =>
                {
                    command = command with { DeveloperId = developerId };
                    Result result = await sender.Send(command, cancellationToken);
                    return result.Match(Results.Created, CustomResults.Problem);
                }
            )
            .WithTags(Tags.Developers)
            .RequireAuthorization(Permissions.Developer);
    }
}
