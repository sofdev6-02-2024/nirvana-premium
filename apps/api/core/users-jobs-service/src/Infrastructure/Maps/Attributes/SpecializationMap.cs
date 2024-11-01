namespace Infrastructure.Maps.Attributes;

using Domain.Attributes.Specializations;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SkInfrastructure.Maps;

internal sealed class SpecializationMap : BaseEntityMap<Specialization>
{
    public override void ConfigureEntity(EntityTypeBuilder<Specialization> builder)
    {
        _ = builder.HasIndex(static u => u.Name).IsUnique();
        _ = builder.Property(static u => u.Name).HasMaxLength(255).IsRequired();

        _ = builder
            .HasMany(static u => u.Jobs)
            .WithOne(static j => j.Specialization)
            .HasForeignKey(static j => j.SpecializationId)
            .IsRequired();

        _ = builder
            .HasMany(static u => u.Developers)
            .WithOne(static d => d.Specialization)
            .HasForeignKey(static d => d.SpecializationId)
            .IsRequired();
    }
}
