namespace Infrastructure.Maps.Joins;

using Domain.Joins.JobLanguages;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SkInfrastructure.Maps;

internal sealed class JobLanguageMap : BaseRegisterMap<JobLanguage>
{
    public override void ConfigureEntity(EntityTypeBuilder<JobLanguage> builder) { }
}
