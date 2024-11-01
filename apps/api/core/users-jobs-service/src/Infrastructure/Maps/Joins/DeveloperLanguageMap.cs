namespace Infrastructure.Maps.Joins;

using Domain.Joins.DeveloperLanguages;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SkInfrastructure.Maps;

internal sealed class DeveloperLanguageMap : BaseRegisterMap<DeveloperLanguage>
{
    public override void ConfigureEntity(EntityTypeBuilder<DeveloperLanguage> builder) { }
}
