namespace Users.Jobs.Service.Api.Endpoints.Jobs;

using Application;
using Application.Jobs.PatchApply;
using MediatR;
using SkDomain.Results;
using SkWeb.Api.Endpoints;
using SkWeb.Api.Infrastructure;

public sealed class PatchApply : IEndpoint
{
    public void MapEndpoint(IEndpointRouteBuilder app)
    {
        _ = app.MapPatch("api/user-jobs/jobs/status/{jobId:guid}",
                static async (Guid jobId, PatchCommand command, ISender sender,
                    CancellationToken cancellationToken) =>
                {
                    command = command with { JobId = jobId };
                    Result result = await sender.Send(command, cancellationToken);
                    return result.Match(Results.Created, CustomResults.Problem);
                })
            .WithTags(Tags.Jobs)
            .RequireAuthorization();
    }
}
