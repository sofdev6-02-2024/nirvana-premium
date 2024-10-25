namespace Infrastructure.Maps;

using Domain.Jobs;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

internal sealed class JobMap : IEntityTypeConfiguration<Job>
{
    public void Configure(EntityTypeBuilder<Job> builder)
    {
        _ = builder.HasKey(static u => u.Id);

        _ = builder.Property(static u => u.Title).HasMaxLength(255).IsRequired();

        _ = builder.Property(static u => u.Description).IsRequired();

        _ = builder.Property(static u => u.SalaryPerHour).IsRequired();

        _ = builder.Property(static u => u.DueDate).IsRequired();

        _ = builder.Property(static u => u.CreatedAt).IsRequired();

        _ = builder.Property(static u => u.Modality).HasConversion<string>().IsRequired();

        _ = builder.Property(static u => u.Schedule).HasConversion<string>().IsRequired();

        _ = builder.Property(static u => u.Status).HasConversion<string>().IsRequired();
    }
}
