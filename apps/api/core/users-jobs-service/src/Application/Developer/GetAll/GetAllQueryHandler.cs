namespace Application.Developer.GetAll;

using Domain.Entities.Developers;
using Microsoft.EntityFrameworkCore;
using Persistent;
using SkApplication.Contracts;
using SkApplication.Responses;
using SkDomain.Results;

internal sealed class GetAllQueryHandler(IApplicationDbContext context)
    : IQueryHandler<GetAllQuery, PagedList<Response>>
{
    public async Task<Result<PagedList<Response>>> Handle(
        GetAllQuery request,
        CancellationToken cancellationToken
    )
    {
        IQueryable<Developer> query = context
            .Developers.Include(developer => developer.Specialization)
            .Include(developer => developer.Languages)
            .Include(developer => developer.Skills);

        if (!await query.AnyAsync(cancellationToken))
        {
            return Result.Failure<PagedList<Response>>(DeveloperErrors.NotDevelopersFound);
        }

        PagedList<Response> response = await PagedList.CreateAsync(
            query,
            new Converter(),
            request.Page,
            request.PageSize
        );

        return response;
    }
}
