namespace Application.Recruiters.PatchDescription;

using Domain.Entities.Recruiters;
using Microsoft.EntityFrameworkCore;
using Persistent;
using SkApplication.Contracts;
using SkDomain.Results;

internal sealed class PatchDescriptionCommandHandler(IApplicationDbContext context)
    : ICommandHandler<PatchDescriptionCommand>
{
    public async Task<Result> Handle(
        PatchDescriptionCommand request,
        CancellationToken cancellationToken
    )
    {
        Recruiter? recruiter = await context.Recruiters.FirstOrDefaultAsync(
            recruiter => recruiter.Id == request.RecruiterId,
            cancellationToken
        );

        if (recruiter is null)
        {
            return Result.Failure(RecruiterErrors.RecruiterNotFound(request.RecruiterId));
        }

        recruiter.Description = request.Description;
        recruiter.UpdatedAt = DateTime.UtcNow;

        context.Recruiters.Update(recruiter);

        await context.SaveChangesAsync(cancellationToken);

        return Result.Success();
    }
}
