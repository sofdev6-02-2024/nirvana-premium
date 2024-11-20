namespace Application.Skills.GetAll;

using Persistent;
using Domain.Attributes.Skills;
using Microsoft.EntityFrameworkCore;
using SkApplication.Contracts;
using SkDomain.Results;

internal sealed class GetAllQueryHandler(IApplicationDbContext context)
    : IQueryHandler<GetAllQuery, IList<Response>>
{
    public async Task<Result<IList<Response>>> Handle(GetAllQuery query,
        CancellationToken cancellationToken)
    {
        IQueryable<Skill> skills = context.Skills;

        if (!await skills.AnyAsync(cancellationToken))
        {
            return Result.Failure<IList<Response>>(SkillErrors.NoSkillsFound);
        }

        Converter converter = new();

        IList<Response> response =
            await skills.Select(s => converter.Convert(s)).ToListAsync(cancellationToken);

        return Result.Success(response);
    }
}
