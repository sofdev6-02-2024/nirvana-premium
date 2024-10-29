namespace Application.Jobs.Create;

using Domain.Jobs;
using Domain.Recruiters;
using Microsoft.EntityFrameworkCore;
using Persistent;
using SkApplication.Contracts;
using SkDomain.Results;

internal sealed class CreateCommandHandler(IApplicationDbContext context)
    : ICommandHandler<CreateCommand, Response>
{
    public async Task<Result<Response>> Handle(
        CreateCommand command,
        CancellationToken cancellationToken
    )
    {
        Recruiter? recruiter = await context
            .Recruiters.AsNoTracking()
            .SingleOrDefaultAsync(u => u.Id == command.RecruiterId, cancellationToken);

        if (recruiter is null)
        {
            return Result.Failure<Response>(RecruiterErrors.RecruiterNotFound(command.RecruiterId));
        }

        Job job = new Converter().Convert(command);

        _ = context.Jobs.Add(job);

        _ = await context.SaveChangesAsync(cancellationToken);

        return new Response(job.Id);
    }
}
