namespace Application.Recruiters.GetApplicationsStatsByJobId;

using Domain.Entities.Jobs;
using Domain.Entities.Recruiters;
using Microsoft.EntityFrameworkCore;
using Persistent;
using SkApplication.Contracts;
using SkDomain.Results;

internal sealed class GetApplicationStatsByJobIdQueryHandler(IApplicationDbContext context)
    : IQueryHandler<GetApplicationsStatsByJobIdQuery, Response>
{
    public async Task<Result<Response>> Handle(
        GetApplicationsStatsByJobIdQuery request,
        CancellationToken cancellationToken
    )
    {
        Recruiter? recruiter = await context
            .Recruiters.Include(recruiter => recruiter.Jobs)
            .ThenInclude(job => job.JobDevelopers)
            .AsNoTracking()
            .AsSplitQuery()
            .FirstOrDefaultAsync(
                recruiter => recruiter.Id == request.RecruiterId,
                cancellationToken
            );

        if (recruiter is null)
        {
            return Result.Failure<Response>(RecruiterErrors.RecruiterNotFound(request.RecruiterId));
        }

        Job? job = recruiter.Jobs.FirstOrDefault(job => job.Id == request.JobId);

        if (job is null)
        {
            return Result.Failure<Response>(JobErrors.JobNotFound(request.JobId));
        }

        Response response = new Converter().Convert(job);

        return response;
    }
}
