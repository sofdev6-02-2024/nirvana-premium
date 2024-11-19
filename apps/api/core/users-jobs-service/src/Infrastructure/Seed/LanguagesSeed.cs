namespace Infrastructure.Seed;

using Domain.Attributes.Languages;
using SkInfrastructure.Seed;

internal sealed class LanguagesSeed
    : BaseSeedEntity<Language>
{
    protected override IEnumerable<Language> GetData()
    {
        return
        [
            new Language
            {
                Name = "Spanish",
            }
        ];
    }
}
