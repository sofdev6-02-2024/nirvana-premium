namespace Application.Developer.GetApplicationsStatsById;

using Domain.Entities.Developers;
using Microsoft.EntityFrameworkCore;
using Persistent;
using SkApplication.Contracts;
using SkDomain.Results;

internal sealed class GetApplicationsStatsByIdQueryHandler(IApplicationDbContext context)
    : IQueryHandler<GetApplicationsStatsByIdQuery, Response>
{
    public async Task<Result<Response>> Handle(
        GetApplicationsStatsByIdQuery request,
        CancellationToken cancellationToken
    )
    {
        Developer? developer = await context
            .Developers.Include(developer => developer.JobDevelopers)
            .AsNoTracking()
            .FirstOrDefaultAsync(
                developer => developer.Id == request.DeveloperId,
                cancellationToken
            );

        if (developer is null)
        {
            return Result.Failure<Response>(DeveloperErrors.DeveloperNotFound(request.DeveloperId));
        }

        Response response = new Converter().Convert(developer);

        return response;
    }
}
