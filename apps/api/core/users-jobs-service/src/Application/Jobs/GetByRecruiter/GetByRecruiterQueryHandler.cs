namespace Application.Jobs.GetByRecruiter;

using Domain.Jobs;
using Microsoft.EntityFrameworkCore;
using Persistent;
using SkApplication.Contracts;
using SkApplication.Responses;
using SkDomain.Results;

internal sealed class GetByRecruiterQueryHandler(IApplicationDbContext context)
    : IQueryHandler<GetByRecruiterQuery, PagedList<Response>>
{
    public async Task<Result<PagedList<Response>>> Handle(
        GetByRecruiterQuery query,
        CancellationToken cancellationToken
    )
    {
        IQueryable<Job> jobs = context
            .Jobs.Where(job => job.RecruiterId == query.RecruiterId)
            .Include(static job => job.Recruiter);

        if (!await jobs.AnyAsync(cancellationToken))
        {
            return Result.Failure<PagedList<Response>>(JobErrors.NotJobsFound);
        }

        return await PagedList.CreateAsync(jobs, new Converter(), query.Page, query.PageSize);
    }
}
