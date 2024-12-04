namespace Application.Developer.GetById;

using Domain.Entities.Developers;
using Microsoft.EntityFrameworkCore;
using Persistent;
using SkApplication.Contracts;
using SkDomain.Results;

internal sealed class GetByIdQueryHandler(IApplicationDbContext context)
    : IQueryHandler<GetByIdQuery, Response>
{
    public async Task<Result<Response>> Handle(
        GetByIdQuery request,
        CancellationToken cancellationToken
    )
    {
        Developer? developer = await context
            .Developers.Include(developer => developer.Specialization)
            .Include(developer => developer.Languages)
            .Include(developer => developer.Skills)
            .AsSplitQuery()
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
