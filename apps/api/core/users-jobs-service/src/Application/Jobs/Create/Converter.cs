namespace Application.Jobs.Create;

using Domain.Enums;
using Domain.Jobs;
using SkApplication.Contracts;

internal sealed class Converter : IConverter<CreateCommand, Job>
{
    public Job Convert(CreateCommand from)
    {
        return new Job
        {
            Id = Guid.NewGuid(),
            Title = from.Title,
            Description = from.Description,
            SalaryPerHour = from.SalaryPerHour,
            DueDate = from.DueDate,
            Modality = Enum.Parse<Modality>(from.Modality),
            Schedule = Enum.Parse<Schedule>(from.Schedule),
            Status = JobStatus.Open,
            Location = from.Location,
            RecruiterId = from.RecruiterId,
            CreatedAt = DateTime.UtcNow,
        };
    }
}
