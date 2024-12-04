namespace Infrastructure.Maps.Entities;

using Domain.Entities.Recruiters;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SkInfrastructure.Maps;

internal sealed class RecruiterMap : BaseEntityMap<Recruiter>
{
    public override void ConfigureEntity(EntityTypeBuilder<Recruiter> builder)
    {
        _ = builder.HasIndex(static r => r.Name).IsUnique();
        _ = builder.Property(static r => r.Name).HasMaxLength(255).IsRequired();

        _ = builder
            .Property(static r => r.Location)
            .HasMaxLength(255)
            .HasDefaultValue(null)
            .ValueGeneratedOnAdd();

        _ = builder.Property(static r => r.Description).HasDefaultValue(null).ValueGeneratedOnAdd();

        _ = builder
            .Property(static r => r.ProfilePictureUrl)
            .HasMaxLength(255)
            .HasDefaultValue(null)
            .ValueGeneratedOnAdd();

        _ = builder.Property(static r => r.IsVerified).HasDefaultValue(false).ValueGeneratedOnAdd();

        _ = builder
            .HasMany(static r => r.Jobs)
            .WithOne(static r => r.Recruiter)
            .HasForeignKey(static r => r.RecruiterId)
            .IsRequired();
    }
}
