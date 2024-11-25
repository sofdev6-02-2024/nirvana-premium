namespace Application.Developer.GetApplicationsById;

using Domain.Entities.Developers;
using Domain.Enums;
using Domain.Joins.JobDevelopers;
using Microsoft.EntityFrameworkCore;
using Persistent;
using SkApplication.Contracts;
using SkApplication.Responses;
using SkDomain.Results;

internal sealed class GetApplicationsByIdQueryHandler(IApplicationDbContext context)
    : IQueryHandler<GetApplicationsByIdQuery, PagedList<Response>>
{
    public async Task<Result<PagedList<Response>>> Handle(
        GetApplicationsByIdQuery request,
        CancellationToken cancellationToken
    )
    {
        Developer? developer = await context
            .Developers.AsNoTracking()
            .FirstOrDefaultAsync(
                developer => developer.Id == request.DeveloperId,
                cancellationToken
            );

        if (developer is null)
        {
            return Result.Failure<PagedList<Response>>(
                DeveloperErrors.DeveloperNotFound(request.DeveloperId)
            );
        }

        IQueryable<JobDeveloper> query = context
            .JobDevelopers.Include(item => item.Job)
            .ThenInclude(item => item.Recruiter)
            .AsNoTracking()
            .Where(jobDeveloper => jobDeveloper.DeveloperId == request.DeveloperId);

        ApplicantStatus status = Enum.Parse<ApplicantStatus>(request.Status, true);

        query = status switch
        {
            ApplicantStatus.All => query.OrderByDescending(jobDeveloper => jobDeveloper.CreatedAt),
            _ => query
                .Where(jobDeveloper => jobDeveloper.Status == status)
                .OrderByDescending(jobDeveloper => jobDeveloper.CreatedAt),
        };

        return await PagedList.CreateAsync(query, new Converter(), request.Page, request.PageSize);
    }
}
