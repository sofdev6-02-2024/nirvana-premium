namespace Infrastructure.Seed.Attributes;

using Domain.Attributes.Languages;
using SkInfrastructure.Seed;

internal sealed class LanguagesSeed : BaseSeedEntity<Language>
{
    protected override IEnumerable<Language> GetData()
    {
        return
        [
            new Language
            {
                Id = Guid.Parse("e3370530-f73e-4d40-8968-88df7d19de91"),
                Name = "English",
            },
            new Language
            {
                Id = Guid.Parse("72176fe3-6943-4f5b-a690-36139ad1774b"),
                Name = "Spanish",
            },
            new Language
            {
                Id = Guid.Parse("8bf95d4b-5c07-4607-90f3-784e8a569cca"),
                Name = "French",
            },
        ];
    }
}
