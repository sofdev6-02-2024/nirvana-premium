namespace Application.Core.Jobs.Create;

using Contracts;
using Domain.Jobs;
using Domain.Jobs.Errors;
using Microsoft.EntityFrameworkCore;
using Persistent;
using SharedKernel.Results;

internal sealed class CreateJobCommandHandler(IApplicationDbContext context)
    : ICommandHandler<CreateJobCommand, JobResponse>
{
    public async Task<Result<JobResponse>> Handle(
        CreateJobCommand command,
        CancellationToken cancellationToken
    )
    {
        if (
            await context
                .Jobs.AsNoTracking()
                .AnyAsync(u => u.Slug == command.Slug, cancellationToken)
        )
        {
            return Result.Failure<JobResponse>(JobErrors.SlugNotUnique);
        }

        Job job =
            new()
            {
                Id = Guid.NewGuid(),
                Slug = command.Slug,
                Title = command.Title,
                Type = command.Type,
                LocationType = command.LocationType,
                Salary = command.Salary,
                CompanyName = command.CompanyName,
                Approved = command.Approved,
                Location = command.Location,
                Description = command.Description,
                ApplicationEmail = command.ApplicationEmail,
                ApplicationUrl = command.ApplicationUrl,
                CompanyLogoUrl = command.CompanyLogoUrl,
                CreatedAt = DateTime.UtcNow,
            };

        context.Jobs.Add(job);

        await context.SaveChangesAsync(cancellationToken);

        return new JobResponse(job.Id);
    }
}
