namespace Users.Jobs.Service.Api.Endpoints.Developers;

using Application.Developer.PatchDescription;
using MediatR;
using SkDomain.Results;
using SkInfrastructure.Authorization;
using SkWeb.Api.Endpoints;
using SkWeb.Api.Infrastructure;

internal sealed class PatchDescription : IEndpoint
{
    public sealed class Request
    {
        public required string Description { get; init; }
    }

    public void MapEndpoint(IEndpointRouteBuilder app)
    {
        _ = app.MapPatch(
                "api/users-jobs/developers/{developerId:guid}/about",
                static async (
                    Guid developerId,
                    Request request,
                    ISender sender,
                    CancellationToken cancellationToken
                ) =>
                {
                    PatchDescriptionCommand command =
                        new() { DeveloperId = developerId, Description = request.Description };

                    Result result = await sender.Send(command, cancellationToken);

                    return result.Match(() => Results.Ok(), CustomResults.Problem);
                }
            )
            .WithTags(Tags.Developers)
            .RequireAuthorization(Permissions.Developer);
    }
}
