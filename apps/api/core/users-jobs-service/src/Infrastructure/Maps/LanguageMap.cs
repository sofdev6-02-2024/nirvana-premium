namespace Infrastructure.Maps;

using Domain.Languages;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

internal sealed class LanguageMap : IEntityTypeConfiguration<Language>
{
    public void Configure(EntityTypeBuilder<Language> builder)
    {
        _ = builder.HasKey(static u => u.Id);

        _ = builder.Property(static u => u.Name).HasMaxLength(255).IsRequired();

        _ = builder
            .HasMany(static u => u.Developers)
            .WithMany(static u => u.Languages)
            .UsingEntity("developer_languages");

        _ = builder
            .HasMany(static u => u.Jobs)
            .WithMany(static u => u.Languages)
            .UsingEntity("job_languages");
    }
}
