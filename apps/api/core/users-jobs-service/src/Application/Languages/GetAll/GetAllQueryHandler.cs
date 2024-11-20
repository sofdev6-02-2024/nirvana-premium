namespace Application.Languages.GetAll;

using Persistent;
using Domain.Attributes.Languages;
using Microsoft.EntityFrameworkCore;
using SkApplication.Contracts;
using SkDomain.Results;

internal sealed class GetAllQueryHandler(IApplicationDbContext context)
    : IQueryHandler<GetAllQuery, IList<Response>>
{
    public async Task<Result<IList<Response>>> Handle(GetAllQuery query,
        CancellationToken cancellationToken)
    {
        IQueryable<Language> languages =
            context.Languages;

        if (!await languages.AnyAsync(cancellationToken))
        {
            return Result.Failure<IList<Response>>(LanguageErrors.NoLanguagesFound);
        }

        Converter converter = new();

        IList<Response> response = await languages.Select(l => converter.Convert(l))
            .ToListAsync(cancellationToken);

        return Result.Success(response);
    }
}
