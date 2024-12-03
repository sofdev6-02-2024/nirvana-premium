namespace Application.Jobs.PatchApply;

using Domain.Enums;
using Domain.Joins.JobDevelopers;
using SkApplication.Contracts;

internal sealed class Converter : IConverter<PatchCommand, JobDeveloper>
{
    public JobDeveloper Convert(PatchCommand from)
    {
        return new JobDeveloper
        {
            JobId = from.JobId,
            DeveloperId = from.DeveloperId,
            Status = Enum.Parse<ApplicantStatus>(from.Status)
        };
    }
}
