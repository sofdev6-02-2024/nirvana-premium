namespace Infrastructure.Persistent.Schemas.Entities;

using Domain.Jobs;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

internal sealed class JobConfiguration : IEntityTypeConfiguration<Job>
{
    public void Configure(EntityTypeBuilder<Job> builder)
    {
        builder.HasKey(u => u.Id);

        builder.HasIndex(u => u.Slug).IsUnique();
    }
}
