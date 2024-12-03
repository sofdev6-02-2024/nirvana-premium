namespace Application.Recruiters.GetApplicantsByJobId;

using Domain.Entities.Jobs;
using Domain.Entities.Recruiters;
using Domain.Enums;
using Domain.Joins.JobDevelopers;
using Microsoft.EntityFrameworkCore;
using Persistent;
using SkApplication.Contracts;
using SkApplication.Responses;
using SkDomain.Results;

internal sealed class GetApplicantsByJobIdQueryHandler(IApplicationDbContext context)
    : IQueryHandler<GetApplicantsByJobIdQuery, Response>
{
    public async Task<Result<Response>> Handle(
        GetApplicantsByJobIdQuery request,
        CancellationToken cancellationToken
    )
    {
        Recruiter? recruiter = await context
            .Recruiters.Include(recruiter => recruiter.Jobs)
            .AsNoTracking()
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

        ApplicantStatus sortStatus = Enum.Parse<ApplicantStatus>(request.Status, true);

        IQueryable<JobDeveloper> jobDevelopers = context
            .JobDevelopers.AsNoTracking()
            .Include(jobDeveloper => jobDeveloper.Developer)
            .Where(jobDeveloper => jobDeveloper.JobId == request.JobId);

        jobDevelopers = sortStatus switch
        {
            ApplicantStatus.All => jobDevelopers.OrderByDescending(jobDeveloper =>
                jobDeveloper.CreatedAt
            ),
            _ => jobDevelopers
                .Where(jobDeveloper => jobDeveloper.Status == sortStatus)
                .OrderByDescending(jobDeveloper => jobDeveloper.CreatedAt),
        };

        PagedList<DeveloperResponse> developersResponse = await PagedList.CreateAsync(
            jobDevelopers,
            new DeveloperConverter(),
            request.Page,
            request.PageSize
        );

        Response response = new Converter(developersResponse).Convert(job);

        return response;
    }
}
