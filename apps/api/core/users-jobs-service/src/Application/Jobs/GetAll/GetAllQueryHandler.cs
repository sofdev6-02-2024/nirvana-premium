namespace Application.Jobs.GetAll;

using Domain.Enums;
using Domain.Jobs;
using Microsoft.EntityFrameworkCore;
using Persistent;
using SkApplication.Contracts;
using SkApplication.Responses;
using SkDomain.Results;

internal sealed class GetAllQueryHandler(IApplicationDbContext context)
    : IQueryHandler<GetAllQuery, PagedList<Response>>
{
    public async Task<Result<PagedList<Response>>> Handle(
        GetAllQuery query,
        CancellationToken cancellationToken
    )
    {
        IQueryable<Job> jobs = context
            .Jobs.Where(job => job.Status == JobStatus.Open)
            .Include(static job => job.Recruiter);

        if (!await jobs.AnyAsync(cancellationToken))
        {
            return Result.Failure<PagedList<Response>>(JobErrors.NotJobsFound);
        }

        return await PagedList.CreateAsync(jobs, new Converter(), query.Page, query.PageSize);
    }
}
