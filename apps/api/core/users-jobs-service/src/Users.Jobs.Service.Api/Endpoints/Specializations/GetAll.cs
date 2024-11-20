namespace Users.Jobs.Service.Api.Endpoints.Specializations;

using Application.Specializations.GetAll;
using MediatR;
using SkDomain.Results;
using SkWeb.Api.Endpoints;
using SkWeb.Api.Infrastructure;

internal sealed class GetAll : IEndpoint
{
    public void MapEndpoint(IEndpointRouteBuilder app)
    {
        _ = app.MapGet(
                "api/users-jobs/specializations",
                static async (
                    ISender sender,
                    CancellationToken cancellationToken
                ) =>
                {
                    GetAllQuery query = new();

                    Result<IList<Response>> result = await sender.Send(
                        query,
                        cancellationToken
                    );

                    return result.Match(Results.Ok, CustomResults.Problem);
                }
            )
            .WithTags(Tags.Specializations);
    }
}
