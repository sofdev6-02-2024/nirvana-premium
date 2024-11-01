namespace Infrastructure.Maps.Attributes;

using Domain.Attributes.Languages;
using Domain.Joins.DeveloperLanguages;
using Domain.Joins.JobLanguages;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SkInfrastructure.Maps;

internal sealed class LanguageMap : BaseEntityMap<Language>
{
    public override void ConfigureEntity(EntityTypeBuilder<Language> builder)
    {
        _ = builder.HasIndex(static u => u.Name).IsUnique();
        _ = builder.Property(static u => u.Name).HasMaxLength(255).IsRequired();

        _ = builder
            .HasMany(static u => u.Developers)
            .WithMany(static u => u.Languages)
            .UsingEntity<DeveloperLanguage>(
                static l =>
                    l.HasOne(static u => u.Developer)
                        .WithMany(static u => u.DeveloperLanguages)
                        .HasForeignKey(static u => u.DeveloperId)
                        .IsRequired(),
                static r =>
                    r.HasOne(static u => u.Language)
                        .WithMany(static u => u.DeveloperLanguages)
                        .HasForeignKey(static u => u.LanguageId)
                        .IsRequired()
            );

        _ = builder
            .HasMany(static u => u.Jobs)
            .WithMany(static u => u.Languages)
            .UsingEntity<JobLanguage>(
                static l =>
                    l.HasOne(static u => u.Job)
                        .WithMany(static u => u.JobLanguages)
                        .HasForeignKey(static u => u.JobId)
                        .IsRequired(),
                static r =>
                    r.HasOne(static u => u.Language)
                        .WithMany(static u => u.JobLanguages)
                        .HasForeignKey(static u => u.LanguageId)
                        .IsRequired()
            );
    }
}
