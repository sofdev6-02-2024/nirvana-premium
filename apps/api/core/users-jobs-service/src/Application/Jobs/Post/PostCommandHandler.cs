namespace Application.Jobs.Post;

using Domain.Attributes.Languages;
using Domain.Attributes.Skills;
using Domain.Attributes.Specializations;
using Domain.Entities.Jobs;
using Domain.Entities.Recruiters;
using Microsoft.EntityFrameworkCore;
using Persistent;
using SkApplication.Contracts;
using SkDomain.Results;

internal sealed class PostCommandHandler(IApplicationDbContext context)
    : ICommandHandler<PostCommand>
{
    public async Task<Result> Handle(PostCommand request, CancellationToken cancellationToken)
    {
        Recruiter? recruiter = await context.Recruiters.FirstOrDefaultAsync(
            recruiter => recruiter.Id == request.RecruiterId,
            cancellationToken
        );

        if (recruiter is null)
        {
            return Result.Failure(RecruiterErrors.RecruiterNotFound(request.RecruiterId));
        }

        Specialization? specialization = await context.Specializations.FirstOrDefaultAsync(
            specialization => specialization.Id == request.SpecializationId,
            cancellationToken
        );

        if (specialization is null)
        {
            return Result.Failure(SpecializationErrors.NotSpecializationsFound);
        }

        foreach (Guid skillId in request.Skills)
        {
            if (!await context.Skills.AnyAsync(skill => skill.Id == skillId, cancellationToken))
            {
                return Result.Failure(SkillErrors.SkillNotFound(skillId));
            }
        }

        foreach (Guid languageId in request.Languages)
        {
            if (
                !await context.Languages.AnyAsync(
                    language => language.Id == languageId,
                    cancellationToken
                )
            )
            {
                return Result.Failure(LanguageErrors.LanguageNotFound(languageId));
            }
        }

        Job job = new Converter().Convert(request);

        await context.Jobs.AddAsync(job, cancellationToken);

        await context.SaveChangesAsync(cancellationToken);

        return Result.Success();
    }
}
