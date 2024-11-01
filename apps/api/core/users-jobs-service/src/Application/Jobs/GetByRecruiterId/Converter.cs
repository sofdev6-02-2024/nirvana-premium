namespace Application.Jobs.GetByRecruiterId;

using Domain.Entities.Jobs;
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
            SalaryPerHour = job.SalaryPerHour,

            Schedule = job.Schedule.GetDescription(),
            Modality = job.Modality.GetDescription(),
            Status = job.Status.GetDescription(),

            Description = job.Description,
            Location = job.Location,

            RecruiterId = job.RecruiterId,
            RecruiterLogo = job.Recruiter.ProfilePictureUrl,

            CreatedAt = job.CreatedAt,
            UpdatedAt = job.UpdatedAt,
        };
    }
}
