namespace Infrastructure.Maps.Entities;

using Domain.Entities.Jobs;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SkInfrastructure.Maps;

internal sealed class JobMap : BaseEntityMap<Job>
{
    public override void ConfigureEntity(EntityTypeBuilder<Job> builder)
    {
        _ = builder.Property(static u => u.Title).HasMaxLength(255).IsRequired();

        _ = builder.Property(static u => u.SalaryPerHour).IsRequired();

        _ = builder.Property(static u => u.Schedule).HasConversion<int>().IsRequired();

        _ = builder.Property(static u => u.Modality).HasConversion<int>().IsRequired();

        _ = builder.Property(static u => u.Status).HasConversion<int>().IsRequired();

        _ = builder
            .Property(static u => u.Description)
            .HasMaxLength(500)
            .HasDefaultValue(null)
            .ValueGeneratedOnAdd();

        _ = builder
            .Property(static u => u.Location)
            .HasMaxLength(255)
            .HasDefaultValue(null)
            .ValueGeneratedOnAdd();
    }
}
