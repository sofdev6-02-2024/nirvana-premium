namespace Application.Developer.GetApplicationsById;

using Domain.Joins.JobDevelopers;
using SkApplication.Contracts;
using SkDomain.Extensions;

internal sealed class Converter : IConverter<JobDeveloper, Response>
{
    public Response Convert(JobDeveloper from)
    {
        return new Response
        {
            Status = from.Status.GetDescription(),
            JobId = from.JobId,
            JobTitle = from.Job.Title,
            RecruiterId = from.Job.RecruiterId,
            RecruiterName = from.Job.Recruiter.Name,
            RecruiterProfileUrl = from.Job.Recruiter.ProfilePictureUrl,
            CreatedAt = from.CreatedAt,
            UpdatedAt = from.UpdatedAt,
        };
    }
}
