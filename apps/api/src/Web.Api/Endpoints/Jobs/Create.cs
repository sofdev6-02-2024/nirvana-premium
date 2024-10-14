namespace Web.Api.Endpoints.Jobs;

using Application.Core.Jobs.Create;
using Infrastructure;
using MediatR;
using SharedKernel.Results;

internal sealed class Create : IEndpoint
{
    public sealed record Request(
        string Slug,
        string Title,
        string Type,
        string LocationType,
        int Salary,
        string CompanyName,
        bool Approved,
        string? Location,
        string? Description,
        string? ApplicationEmail,
        Uri? ApplicationUrl,
        Uri? CompanyLogoUrl
    );

    public void MapEndpoint(IEndpointRouteBuilder app)
    {
        app.MapPost(
                "jobs",
                async (Request request, ISender sender, CancellationToken cancellationToken) =>
                {
                    CreateJobCommand command =
                        new(
                            request.Slug,
                            request.Title,
                            request.Type,
                            request.LocationType,
                            request.Salary,
                            request.CompanyName,
                            request.Approved,
                            request.Location,
                            request.Description,
                            request.ApplicationEmail,
                            request.ApplicationUrl,
                            request.CompanyLogoUrl
                        );

                    Result<JobResponse> result = await sender.Send(command, cancellationToken);

                    return result.Match(Results.Ok, CustomResults.Problem);
                }
            )
            .WithTags(Tags.Jobs);
    }
}
