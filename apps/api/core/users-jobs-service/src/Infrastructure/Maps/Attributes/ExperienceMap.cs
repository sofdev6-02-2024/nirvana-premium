namespace Infrastructure.Maps.Attributes;

using Domain.Attributes.Experiences;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SkInfrastructure.Maps;

internal sealed class ExperienceMap : BaseEntityMap<Experience>
{
    public override void ConfigureEntity(EntityTypeBuilder<Experience> builder)
    {
        _ = builder.Property(static e => e.Title).HasMaxLength(150).IsRequired();

        _ = builder.Property(static e => e.Employer).HasMaxLength(100).IsRequired();

        _ = builder.Property(static e => e.StartDate).IsRequired();

        _ = builder.Property(static e => e.EndDate).HasDefaultValue(null).ValueGeneratedOnAdd();

        _ = builder
            .Property(static e => e.Description)
            .HasMaxLength(500)
            .HasDefaultValue(null)
            .ValueGeneratedOnAdd();

        _ = builder
            .HasOne(static e => e.Developer)
            .WithMany(static d => d.Experiences)
            .HasForeignKey(static e => e.DeveloperId)
            .IsRequired();
    }
}
