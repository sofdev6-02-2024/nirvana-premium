namespace Infrastructure.Maps.Attributes;

using Domain.Attributes.JobAttachments;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SkInfrastructure.Maps;

internal sealed class JobAttachmentMap : BaseEntityMap<JobAttachment>
{
    public override void ConfigureEntity(EntityTypeBuilder<JobAttachment> builder)
    {
        _ = builder.Property(static u => u.Url).HasMaxLength(255).IsRequired();

        _ = builder
            .HasOne(static j => j.Job)
            .WithMany(static j => j.Attachments)
            .HasForeignKey(static j => j.JobId)
            .IsRequired();
    }
}
