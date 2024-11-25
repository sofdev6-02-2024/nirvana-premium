namespace Application.Developer.GetApplicationsStatsById;

using Domain.Entities.Developers;
using Domain.Enums;
using SkApplication.Contracts;

internal sealed class Converter : IConverter<Developer, Response>
{
    public Response Convert(Developer from)
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
