namespace Users.Jobs.Service.Api.Endpoints.Recruiters;

using Application;
using Application.Recruiters.PatchDescription;
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
                "api/users-jobs/recruiters/{recruiterId:guid}/about",
                static async (
                    Guid recruiterId,
                    Request request,
                    ISender sender,
                    CancellationToken cancellationToken
                ) =>
                {
                    PatchDescriptionCommand command =
                        new() { RecruiterId = recruiterId, Description = request.Description };

                    Result result = await sender.Send(command, cancellationToken);

                    return result.Match(() => Results.Ok(), CustomResults.Problem);
                }
            )
            .WithTags(Tags.Recruiters)
            .RequireAuthorization(Permissions.Recruiter);
    }
}
