namespace Infrastructure.Seed.Attributes.Data;

using Domain.Attributes.Languages;
using Ids;
using SkInfrastructure.Seed;

internal sealed class LanguagesSeed : BaseSeedEntity<Language>
{
    protected override IEnumerable<Language> GetData()
    {
        return
        [
            new Language { Id = LanguagesId.English, Name = "English" },
            new Language { Id = LanguagesId.Spanish, Name = "Spanish" },
            new Language { Id = LanguagesId.French, Name = "French" },
        ];
    }
}
