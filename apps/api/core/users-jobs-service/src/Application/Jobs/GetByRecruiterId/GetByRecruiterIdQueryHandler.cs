namespace Application.Jobs.GetByRecruiterId;

using Domain.Entities.Jobs;
using Domain.Entities.Recruiters;
using Microsoft.EntityFrameworkCore;
using Persistent;
using SkApplication.Contracts;
using SkApplication.Responses;
using SkDomain.Results;

internal sealed class GetByRecruiterIdQueryHandler(IApplicationDbContext context)
    : IQueryHandler<GetByRecruiterIdQuery, PagedList<Response>>
{
    public async Task<Result<PagedList<Response>>> Handle(
        GetByRecruiterIdQuery query,
        CancellationToken cancellationToken
    )
    {
        Recruiter? recruiter = await context
            .Recruiters.Where(recruiter => recruiter.Id == query.RecruiterId)
            .AsNoTracking()
            .SingleOrDefaultAsync(cancellationToken);

        if (recruiter is null)
        {
            return Result.Failure<PagedList<Response>>(
                RecruiterErrors.RecruiterNotFound(query.RecruiterId)
            );
        }

        IQueryable<Job> jobs = context
            .Jobs.Where(job => job.RecruiterId == query.RecruiterId)
            .Include(static job => job.Recruiter)
            .OrderByDescending(job => job.UpdatedAt);

        if (!await jobs.AnyAsync(cancellationToken))
        {
            return Result.Failure<PagedList<Response>>(JobErrors.NotJobsFound);
        }

        return await PagedList.CreateAsync(jobs, new Converter(), query.Page, query.PageSize);
    }
}
