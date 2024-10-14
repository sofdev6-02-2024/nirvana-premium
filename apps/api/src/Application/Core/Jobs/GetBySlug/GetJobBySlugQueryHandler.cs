namespace Application.Core.Jobs.GetBySlug;

using Contracts;
using Domain.Jobs.Errors;
using Microsoft.EntityFrameworkCore;
using Persistent;
using SharedKernel.Results;

internal sealed class GetUserByIdQueryHandler(IApplicationDbContext context)
    : IQueryHandler<GetJobBySlugQuery, JobResponse>
{
    public async Task<Result<JobResponse>> Handle(
        GetJobBySlugQuery query,
        CancellationToken cancellationToken
    )
    {
        JobResponse? job = await context
            .Jobs.Where(j => j.Slug == query.Slug)
            .Select(j => new JobResponse(j))
            .SingleOrDefaultAsync(cancellationToken);

        if (job is null)
        {
            return Result.Failure<JobResponse>(JobErrors.NotFoundBySlug);
        }

        return job;
    }
}
