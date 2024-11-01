namespace Infrastructure.Maps.Joins;

using Domain.Enums;
using Domain.Joins.JobDevelopers;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SkInfrastructure.Maps;

internal sealed class JobDeveloperMap : BaseRegisterMap<JobDeveloper>
{
    public override void ConfigureEntity(EntityTypeBuilder<JobDeveloper> builder)
    {
        _ = builder
            .Property(static x => x.Status)
            .HasConversion<int>()
            .HasDefaultValue(ApplicantStatus.Published)
            .ValueGeneratedOnAdd();
    }
}
