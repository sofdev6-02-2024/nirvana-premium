namespace Infrastructure.Maps;

using Domain.Recruiters;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

internal sealed class RecruiterMap : IEntityTypeConfiguration<Recruiter>
{
    public void Configure(EntityTypeBuilder<Recruiter> builder)
    {
        _ = builder.HasKey(static u => u.Id);

        _ = builder.Property(static u => u.Name).HasMaxLength(255).IsRequired();

        _ = builder.Property(static u => u.IsVerified).HasDefaultValue(false);

        _ = builder
            .HasOne(static u => u.User)
            .WithOne()
            .HasForeignKey<Recruiter>(static u => u.UserId)
            .IsRequired();

        _ = builder
            .HasMany(static u => u.Jobs)
            .WithOne(static u => u.Recruiter)
            .HasForeignKey(static u => u.RecruiterId)
            .IsRequired();
    }
}
