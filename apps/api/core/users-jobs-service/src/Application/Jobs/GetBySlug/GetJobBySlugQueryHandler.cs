namespace Application.Jobs.GetBySlug;

using Domain.Jobs;
using Microsoft.EntityFrameworkCore;
using Persistent;
using SkApplication.Contracts;
using SkDomain.Results;

internal sealed class GetUserByIdQueryHandler(IApplicationDbContext context)
    : IQueryHandler<GetJobBySlugQuery, Response>
{
    public async Task<Result<Response>> Handle(
        GetJobBySlugQuery query,
        CancellationToken cancellationToken
    )
    {
        Response? job = await context
            .Jobs.Where(j => j.Slug == query.Slug)
            .Select(j => new Response(j))
            .SingleOrDefaultAsync(cancellationToken);

        if (job is null)
        {
            return Result.Failure<Response>(JobErrors.NotFoundBySlug);
        }

        return job;
    }
}
