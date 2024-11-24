namespace Application.Jobs.Post;

using System.Collections.ObjectModel;
using Domain.Attributes.Languages;
using Domain.Attributes.Skills;
using Domain.Attributes.Specializations;
using Domain.Entities.Jobs;
using Domain.Entities.Recruiters;
using Microsoft.EntityFrameworkCore;
using Persistent;
using SkApplication.Contracts;
using SkDomain.Extensions;
using SkDomain.Results;

internal sealed class PostCommandHandler(IApplicationDbContext context)
    : ICommandHandler<PostCommand, Response>
{
    public async Task<Result<Response>> Handle(PostCommand request,
        CancellationToken cancellationToken)
    {
        Recruiter? recruiter = await context.Recruiters.FindAsync(
            new object?[] { request.RecruiterId }, cancellationToken: cancellationToken);
        if (recruiter is null)
        {
            return Result.Failure<Response>(RecruiterErrors.RecruiterNotFound(request.RecruiterId));
        }

        Specialization? specialization = await context.Specializations.FindAsync(
            new object?[] { request.SpecializationId }, cancellationToken: cancellationToken);
        if (specialization is null)
        {
            return Result.Failure<Response>(SpecializationErrors.NotSpecializationsFound);
        }

        List<Skill> skills = await context.Skills.Where(s => request.Skills.Contains(s.Id))
            .ToListAsync(cancellationToken);

        if (skills.Count != request.Skills.Count)
        {
            return Result.Failure<Response>(SkillErrors.NoSkillsFound);
        }

        List<Language> languages = await context.Languages
            .Where(s => request.Languages.Contains(s.Id))
            .ToListAsync(cancellationToken);

        if (languages.Count != request.Languages.Count)
        {
            return Result.Failure<Response>(LanguageErrors.NoLanguagesFound);
        }

        Converter converter = new();
        Job job = converter.Convert(request);
        await context.Jobs.AddAsync(job, cancellationToken);

        int result = await context.SaveChangesAsync(cancellationToken);

        if (result == 0)
        {
            return Result.Failure<Response>(JobErrors.JobNotCreated);
        }

        return Result.Success(new Response()
        {
            Title = job.Title,
            SalaryPerHour = job.SalaryPerHour,
            Schedule = job.Schedule.GetDescription(),
            Modality = job.Modality.GetDescription(),
            Location = job.Location,
            Description = job.Description,
            Skills = new ReadOnlyCollection<Guid>(job.Skills.Select(s => s.Id).ToList()),
            Languages = new ReadOnlyCollection<Guid>(job.Languages.Select(l => l.Id).ToList()),
            RecruiterId = job.RecruiterId,
            SpecializationId = job.SpecializationId
        });
    }
}
