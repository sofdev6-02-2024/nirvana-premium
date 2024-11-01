namespace Infrastructure.Maps.Attributes;

using Domain.Attributes.Skills;
using Domain.Joins.DeveloperSkills;
using Domain.Joins.JobSkills;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SkInfrastructure.Maps;

internal sealed class SkillMap : BaseEntityMap<Skill>
{
    public override void ConfigureEntity(EntityTypeBuilder<Skill> builder)
    {
        _ = builder.HasIndex(static u => u.Name).IsUnique();
        _ = builder.Property(static u => u.Name).HasMaxLength(255).IsRequired();

        _ = builder
            .HasMany(static u => u.Developers)
            .WithMany(static u => u.Skills)
            .UsingEntity<DeveloperSkill>(
                static l =>
                    l.HasOne(static u => u.Developer)
                        .WithMany(static u => u.DeveloperSkills)
                        .HasForeignKey(static u => u.DeveloperId)
                        .IsRequired(),
                static r =>
                    r.HasOne(static u => u.Skill)
                        .WithMany(static u => u.DeveloperSkills)
                        .HasForeignKey(static u => u.SkillId)
                        .IsRequired()
            );

        _ = builder
            .HasMany(static u => u.Jobs)
            .WithMany(static u => u.Skills)
            .UsingEntity<JobSkill>(
                static l =>
                    l.HasOne(static u => u.Job)
                        .WithMany(static u => u.JobSkills)
                        .HasForeignKey(static u => u.JobId)
                        .IsRequired(),
                static r =>
                    r.HasOne(static u => u.Skill)
                        .WithMany(static u => u.JobSkills)
                        .HasForeignKey(static u => u.SkillId)
                        .IsRequired()
            );
    }
}
