namespace Application.Recruiters.GetApplicationsStatsByJobId;

using Domain.Entities.Jobs;
using Domain.Enums;
using SkApplication.Contracts;

internal sealed class Converter : IConverter<Job, Response>
{
    public Response Convert(Job from)
    {
        return new Response
        {
            Total = from.JobDevelopers.Count,
            Pending = from.JobDevelopers.Count(itm => itm.Status == ApplicantStatus.Published),
            Accepted = from.JobDevelopers.Count(itm => itm.Status == ApplicantStatus.Accepted),
            Rejected = from.JobDevelopers.Count(itm => itm.Status == ApplicantStatus.Rejected),
            Viewed = from.JobDevelopers.Count(itm => itm.Status == ApplicantStatus.Viewed),
        };
    }
}
