namespace Infrastructure.Maps;

using Domain.Specializations;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

internal sealed class SpecializationMap : IEntityTypeConfiguration<Specialization>
{
    public void Configure(EntityTypeBuilder<Specialization> builder)
    {
        _ = builder.HasKey(static u => u.Id);

        _ = builder.Property(static u => u.Name).HasMaxLength(255).IsRequired();
    }
}
