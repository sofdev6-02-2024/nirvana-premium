namespace Infrastructure.Maps;

using Domain.Jobs;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

internal sealed class JobConfiguration : IEntityTypeConfiguration<Job>
{
    public void Configure(EntityTypeBuilder<Job> builder)
    {
        _ = builder.HasKey(static u => u.Id);

        _ = builder.HasIndex(static u => u.Slug).IsUnique();
    }
}
