namespace Domain.Attributes.JobAttachments;

using Entities.Jobs;
using SkDomain.Entities;

public sealed class JobAttachment : BaseEntity
{
    public required Uri Url { get; set; }

    public required Guid JobId { get; init; }
    public Job Job { get; init; } = default!;
}
