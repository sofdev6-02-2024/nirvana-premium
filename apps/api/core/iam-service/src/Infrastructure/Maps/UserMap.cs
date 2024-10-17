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

        _ = builder.Property(static u => u.Email).IsRequired().HasMaxLength(255);

        _ = builder.Property(static u => u.FirstName).IsRequired().HasMaxLength(100);

        _ = builder.Property(static u => u.LastName).IsRequired().HasMaxLength(100);

        _ = builder.Property(static u => u.Role).HasConversion<int>().IsRequired();

        _ = builder.HasIndex(static u => u.IdentityId).IsUnique();

        _ = builder.Property(static u => u.IdentityId).IsRequired();
    }
}
