namespace Infrastructure.Maps;

using Domain.Users;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

internal sealed class UserMap : IEntityTypeConfiguration<User>
{
    public void Configure(EntityTypeBuilder<User> builder)
    {
        _ = builder.HasKey(static u => u.Id);

        _ = builder.HasIndex(static u => u.Email).IsUnique();

        _ = builder.HasIndex(static u => u.IdentityId).IsUnique();

        _ = builder.Property(static u => u.Email).HasMaxLength(255).IsRequired();

        _ = builder.Property(static u => u.DoOnboarding).HasDefaultValue(false);

        _ = builder.Property(static u => u.IdentityId).IsRequired();

        _ = builder.Property(static u => u.Role).HasConversion<string>().IsRequired();
    }
}
