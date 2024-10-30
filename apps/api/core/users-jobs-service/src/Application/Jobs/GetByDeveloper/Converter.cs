namespace Application.Jobs.GetByDeveloper;

using Domain.Jobs;
using SkApplication.Contracts;
using SkDomain.Extensions;

internal sealed class Converter : IConverter<Job, Response>
{
    public Response Convert(Job job)
    {
        return new Response
        {
            Id = job.Id,
            Title = job.Title,
            Schedule = job.Schedule.GetDescription(),
            Modality = job.Modality.GetDescription(),
            RecruiterId = job.RecruiterId,
            RecruiterLogo = job.Recruiter.ProfilePictureUrl,
            Location = job.Location,
            Description = job.Description,
            SalaryPerHour = job.SalaryPerHour,
            Status = job.Status.GetDescription(),
            CreatedAt = job.CreatedAt,
            UpdatedAt = job.UpdatedAt,
        };
    }
}
