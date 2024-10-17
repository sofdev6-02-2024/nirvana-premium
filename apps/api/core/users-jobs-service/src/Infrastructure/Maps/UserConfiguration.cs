namespace Infrastructure.Maps;

using Domain.Users;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

internal sealed class UserConfiguration : IEntityTypeConfiguration<User>
{
    public void Configure(EntityTypeBuilder<User> builder)
    {
        _ = builder.HasKey(static u => u.Id);

        _ = builder.HasIndex(static u => u.Email).IsUnique();

        _ = builder.HasIndex(static u => u.IdentityId).IsUnique();
    }
}
