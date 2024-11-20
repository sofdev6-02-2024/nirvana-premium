namespace Application.Languages.GetAll;

using Persistent;
using Domain.Attributes.Languages;
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

        IQueryable<Domain.Attributes.Languages.Language> languages =
            context.Languages.OrderBy(language => language.Name);

        List<Domain.Attributes.Languages.Language> languageList =
            await languages.ToListAsync(cancellationToken).ConfigureAwait(false);


        if (!await languages.AnyAsync(cancellationToken).ConfigureAwait(false))
        {
            return Result.Failure<Response>(LanguageErrors.NoLanguagesFound);
        }

        Response response = converter.Convert(languageList);
        return Result.Success(response);
    }
}
