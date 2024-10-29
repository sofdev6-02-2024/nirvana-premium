namespace Infrastructure.Maps;

using Domain.Developers;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

internal sealed class DeveloperMap : IEntityTypeConfiguration<Developer>
{
    public void Configure(EntityTypeBuilder<Developer> builder)
    {
        _ = builder.HasKey(static u => u.Id);

        _ = builder.Property(static u => u.Name).HasMaxLength(255).IsRequired();

        _ = builder.Property(static u => u.LastName).HasMaxLength(255).IsRequired();

        _ = builder.Property(static u => u.YearsOfExperience).IsRequired();

        _ = builder.Property(static u => u.SalaryPerHourExpected).IsRequired();

        _ = builder.Property(static u => u.ModalityPreferred).HasConversion<int>().IsRequired();

        _ = builder
            .HasOne(static u => u.User)
            .WithOne()
            .HasForeignKey<Developer>(static u => u.UserId)
            .IsRequired();

        _ = builder
            .HasOne(static u => u.Specialization)
            .WithMany()
            .HasForeignKey(static u => u.SpecializationId)
            .IsRequired();
    }
}
