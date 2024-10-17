namespace Application.Jobs.Create;

using Domain.Jobs;
using Microsoft.EntityFrameworkCore;
using Persistent;
using SkApplication.Contracts;
using SkDomain.Results;

internal sealed class CreateJobCommandHandler(IApplicationDbContext context)
    : ICommandHandler<CreateJobCommand, Response>
{
    public async Task<Result<Response>> Handle(
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
            return Result.Failure<Response>(JobErrors.SlugNotUnique);
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

        _ = context.Jobs.Add(job);

        _ = await context.SaveChangesAsync(cancellationToken);

        return new Response(job.Id);
    }
}
