namespace Infrastructure.Maps.Joins;

using Domain.Joins.DeveloperSkills;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SkInfrastructure.Maps;

internal sealed class DeveloperSkillMap : BaseRegisterMap<DeveloperSkill>
{
    public override void ConfigureEntity(EntityTypeBuilder<DeveloperSkill> builder) { }
}
