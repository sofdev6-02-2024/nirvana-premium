namespace Infrastructure.Maps;

using Domain.Skills;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

internal sealed class SkillMap : IEntityTypeConfiguration<Skill>
{
    public void Configure(EntityTypeBuilder<Skill> builder)
    {
        _ = builder.HasKey(static u => u.Id);

        _ = builder.Property(static u => u.Name).HasMaxLength(255).IsRequired();

        _ = builder
            .HasMany(static u => u.Developers)
            .WithMany(static u => u.Skills)
            .UsingEntity("developer_skills");

        _ = builder
            .HasMany(static u => u.Jobs)
            .WithMany(static u => u.Skills)
            .UsingEntity("job_skills");
    }
}
