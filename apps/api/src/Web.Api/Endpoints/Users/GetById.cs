namespace Web.Api.Endpoints.Users;

using Application.Core.Users.GetById;
using Infrastructure;
using MediatR;
using SharedKernel.Results;

internal sealed class GetById : IEndpoint
{
    public void MapEndpoint(IEndpointRouteBuilder app)
    {
        app.MapGet(
                "users/{userId}",
                async (Guid userId, ISender sender, CancellationToken cancellationToken) =>
                {
                    GetUserByIdQuery query = new(userId);

                    Result<UserResponse> result = await sender.Send(query, cancellationToken);

                    return result.Match(Results.Ok, CustomResults.Problem);
                }
            )
            .WithTags(Tags.Users)
            .RequireAuthorization();
    }
}
