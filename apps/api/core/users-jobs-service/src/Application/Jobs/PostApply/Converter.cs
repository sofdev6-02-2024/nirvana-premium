namespace Application.Jobs.PostApply;

using Domain.Enums;
using Domain.Joins.JobDevelopers;
using SkApplication.Contracts;

internal sealed class Converter : IConverter<PostCommand, JobDeveloper>
{
    public JobDeveloper Convert(PostCommand from)
    {
        return new JobDeveloper()
        {
            JobId = from.JobId,
            DeveloperId = from.DeveloperId,
            Status = (ApplicantStatus)Enum.Parse(typeof(ApplicantStatus), from.Status),
        };
    }
}
