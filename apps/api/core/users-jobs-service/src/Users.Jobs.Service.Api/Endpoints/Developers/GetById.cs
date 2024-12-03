namespace Users.Jobs.Service.Api.Endpoints.Developers;

using Application;
using Application.Developer.GetById;
using MediatR;
using SkDomain.Results;
using SkWeb.Api.Endpoints;
using SkWeb.Api.Extensions;
using SkWeb.Api.Infrastructure;

internal sealed class GetById : IEndpoint
{
    public void MapEndpoint(IEndpointRouteBuilder app)
    {
        _ = app.MapGet(
                "api/users-jobs/developers/{developerId:guid}",
                static async (
                    Guid developerId,
                    ISender sender,
                    CancellationToken cancellationToken
                ) =>
                {
                    GetByIdQuery query = new(developerId);

                    Result<Response> result = await sender.Send(query, cancellationToken);

                    return result.Match(Results.Ok, CustomResults.Problem);
                }
            )
            .WithTags(Tags.Developers)
            .AddCache(Tags.Developers);
    }
}
