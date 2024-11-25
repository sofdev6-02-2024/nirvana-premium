namespace Application.Recruiters.GetApplicantsByJobId;

using Domain.Entities.Jobs;
using Domain.Joins.JobDevelopers;
using SkApplication.Contracts;
using SkApplication.Responses;
using SkDomain.Extensions;

internal sealed class DeveloperConverter : IConverter<JobDeveloper, DeveloperResponse>
{
    public DeveloperResponse Convert(JobDeveloper from)
    {
        return new DeveloperResponse
        {
            DeveloperId = from.DeveloperId,
            DeveloperName = from.Developer.Name,
            DeveloperLastName = from.Developer.LastName,
            DeveloperProfileUrl = from.Developer.ProfilePictureUrl,
            Status = from.Status.GetDescription(),
            CreatedAt = from.CreatedAt,
            UpdatedAt = from.UpdatedAt,
        };
    }
}

internal sealed class Converter(PagedList<DeveloperResponse> developers) : IConverter<Job, Response>
{
    public Response Convert(Job from)
    {
        return new Response
        {
            JobId = from.Id,
            JobTitle = from.Title,
            Developers = developers,
        };
    }
}
