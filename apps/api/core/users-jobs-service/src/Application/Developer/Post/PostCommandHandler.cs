namespace Application.Developer.Post;

using Domain.Attributes.Languages;
using Domain.Attributes.Skills;
using Domain.Attributes.Specializations;
using Domain.Entities.Developers;
using Domain.Entities.Users;
using Microsoft.EntityFrameworkCore;
using Persistent;
using SkApplication.Contracts;
using SkDomain.Results;

internal sealed class PostCommandHandler(IApplicationDbContext context)
    : ICommandHandler<PostCommand>
{
    public async Task<Result> Handle(PostCommand request, CancellationToken cancellationToken)
    {
        User? user = await context.Users.FirstOrDefaultAsync(
            recruiter => recruiter.Id == request.UserId,
            cancellationToken
        );

        if (user is null)
        {
            return Result.Failure(UserErrors.UserNotFound(request.UserId));
        }

        Specialization? specialization = await context.Specializations.FirstOrDefaultAsync(
            specialization => specialization.Id == request.SpecializationId,
            cancellationToken
        );

        if (specialization is null)
        {
            return Result.Failure(
                SpecializationErrors.SpecializationNotFound(request.SpecializationId)
            );
        }

        foreach (Guid skillId in request.Skills)
        {
            if (!await context.Skills.AnyAsync(skill => skill.Id == skillId, cancellationToken))
            {
                return Result.Failure(SkillErrors.SkillNotFound(skillId));
            }
        }

        foreach (Guid languageId in request.SpokenLanguages)
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

        Developer developer = new Converter().Convert(request);

        await context.Developers.AddAsync(developer, cancellationToken);

        await context.SaveChangesAsync(cancellationToken);

        return Result.Success();
    }
}
