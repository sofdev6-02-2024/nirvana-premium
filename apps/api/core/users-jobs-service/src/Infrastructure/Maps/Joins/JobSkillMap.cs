namespace Infrastructure.Maps.Joins;

using Domain.Joins.JobSkills;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SkInfrastructure.Maps;

internal sealed class JobSkillMap : BaseRegisterMap<JobSkill>
{
    public override void ConfigureEntity(EntityTypeBuilder<JobSkill> builder) { }
}
