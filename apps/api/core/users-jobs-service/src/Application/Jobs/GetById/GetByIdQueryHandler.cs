namespace Application.Jobs.GetById;

using Domain.Entities.Jobs;
using Microsoft.EntityFrameworkCore;
using Persistent;
using SkApplication.Contracts;
using SkDomain.Results;

internal sealed class GetByIdQueryHandler(IApplicationDbContext context)
    : IQueryHandler<GetByIdQuery, Response>
{
    public async Task<Result<Response>> Handle(
        GetByIdQuery query,
        CancellationToken cancellationToken
    )
    {
        Job? job = await context
            .Jobs.Where(job => job.Id == query.JobId)
            .Include(static job => job.Recruiter)
            .AsNoTracking()
            .SingleOrDefaultAsync(cancellationToken);

        if (job is null)
        {
            return Result.Failure<Response>(JobErrors.JobNotFound(query.JobId));
        }

        Response response = new Converter().Convert(job);

        return response;
    }
}
