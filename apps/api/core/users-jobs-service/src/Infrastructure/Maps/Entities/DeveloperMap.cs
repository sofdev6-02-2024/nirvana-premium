namespace Infrastructure.Maps.Entities;

using Domain.Entities.Developers;
using Domain.Joins.JobDevelopers;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SkInfrastructure.Maps;

internal sealed class DeveloperMap : BaseEntityMap<Developer>
{
    public override void ConfigureEntity(EntityTypeBuilder<Developer> builder)
    {
        _ = builder.Property(static u => u.Name).HasMaxLength(255).IsRequired();

        _ = builder.Property(static u => u.LastName).HasMaxLength(255).IsRequired();

        _ = builder.Property(static u => u.YearsOfExperience).IsRequired();

        _ = builder.Property(static u => u.SalaryPerHourExpected).IsRequired();

        _ = builder.Property(static u => u.ModalityPreferred).HasConversion<int>().IsRequired();

        _ = builder
            .Property(static u => u.Location)
            .HasMaxLength(255)
            .HasDefaultValue(null)
            .ValueGeneratedOnAdd();

        _ = builder
            .Property(static u => u.PortfolioUrl)
            .HasMaxLength(255)
            .HasDefaultValue(null)
            .ValueGeneratedOnAdd();

        _ = builder
            .Property(static u => u.ProfilePictureUrl)
            .HasMaxLength(500)
            .HasDefaultValue(null)
            .ValueGeneratedOnAdd();

        _ = builder.Property(static u => u.Description).HasDefaultValue(null).ValueGeneratedOnAdd();

        _ = builder
            .HasMany(static d => d.Jobs)
            .WithMany(static j => j.Developers)
            .UsingEntity<JobDeveloper>(
                static j =>
                    j.HasOne(static jd => jd.Job)
                        .WithMany(static j => j.JobDevelopers)
                        .HasForeignKey(static jd => jd.JobId)
                        .IsRequired(),
                static d =>
                    d.HasOne(static jd => jd.Developer)
                        .WithMany(static d => d.JobDevelopers)
                        .HasForeignKey(static jd => jd.DeveloperId)
                        .IsRequired()
            );
    }
}
