namespace Application.Skills.GetAll;

using Persistent;
using Domain.Attributes.Skills;
using Microsoft.EntityFrameworkCore;
using SkApplication.Contracts;
using SkDomain.Results;

internal sealed class GetAllQueryHandler(IApplicationDbContext context)
    : IQueryHandler<GetAllQuery, Response>
{

    public async Task<Result<Response>> Handle(GetAllQuery query,
        CancellationToken cancellationToken)
    {
        Converter converter = new();

        IQueryable<Domain.Attributes.Skills.Skill> skills =
            context.Skills.OrderBy(skill => skill.Name);

        List<Domain.Attributes.Skills.Skill> skillList =
            await skills.ToListAsync(cancellationToken).ConfigureAwait(false);


        if (!await skills.AnyAsync(cancellationToken).ConfigureAwait(false))
        {
            return Result.Failure<Response>(SkillErrors.NoSkillsFound);
        }

        Response response = converter.Convert(skillList);
        return Result.Success(response);
    }
}
