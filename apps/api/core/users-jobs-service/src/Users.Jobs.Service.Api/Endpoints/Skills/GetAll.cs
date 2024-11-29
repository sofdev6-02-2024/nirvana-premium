namespace Users.Jobs.Service.Api.Endpoints.Skills;

using Application;
using Application.Skills.GetAll;
using MediatR;
using SkDomain.Results;
using SkWeb.Api.Endpoints;
using SkWeb.Api.Extensions;
using SkWeb.Api.Infrastructure;

internal sealed class GetAll : IEndpoint
{
    public void MapEndpoint(IEndpointRouteBuilder app)
    {
        _ = app.MapGet(
                "api/users-jobs/skills",
                static async (ISender sender, CancellationToken cancellationToken) =>
                {
                    GetAllQuery query = new();

                    Result<IList<Response>> result = await sender.Send(query, cancellationToken);

                    return result.Match(Results.Ok, CustomResults.Problem);
                }
            )
            .WithTags(Tags.Skills)
            .AddCache(Tags.Skills);
    }
}
