namespace Application.Recruiters.GetAll;

using Domain.Entities.Recruiters;
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
        IQueryable<Recruiter> recruiters = context.Recruiters.OrderByDescending(recruiter =>
            recruiter.UpdatedAt
        );

        if (!await recruiters.AnyAsync(cancellationToken))
        {
            return Result.Failure<PagedList<Response>>(RecruiterErrors.NotRecruitersFound);
        }

        return await PagedList.CreateAsync(recruiters, new Converter(), query.Page, query.PageSize);
    }
}
