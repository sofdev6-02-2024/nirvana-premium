namespace Users.Jobs.Service.Api.Endpoints.Jobs;

using Application;
using Application.Jobs.PostApply;
using MediatR;
using SkDomain.Results;
using SkInfrastructure.Authorization;
using SkWeb.Api.Endpoints;
using SkWeb.Api.Infrastructure;

internal sealed class PostApply : IEndpoint
{
    public sealed class Request
    {
        public required Guid DeveloperId { get; init; }
    }

    public void MapEndpoint(IEndpointRouteBuilder app)
    {
        _ = app.MapPost(
                "api/users-jobs/jobs/apply/{jobId:guid}",
                static async (
                    Guid jobId,
                    Request request,
                    ISender sender,
                    CancellationToken cancellationToken
                ) =>
                {
                    PostCommand command =
                        new() { JobId = jobId, DeveloperId = request.DeveloperId };

                    Result result = await sender.Send(command, cancellationToken);

                    return result.Match(Results.Created, CustomResults.Problem);
                }
            )
            .WithTags(Tags.Jobs)
            .RequireAuthorization(Permissions.Developer);
    }
}
