namespace Application.Jobs.Post;

using Domain.Entities.Jobs;
using Domain.Enums;
using Domain.Joins.JobLanguages;
using Domain.Joins.JobSkills;
using SkApplication.Contracts;

internal sealed class Converter : IConverter<PostCommand, Job>
{
    public Job Convert(PostCommand from)
    {
        return new Job()
        {
            Title = from.Title,
            SalaryPerHour = from.SalaryPerHour,
            Schedule = (Schedule)Enum.Parse(typeof(Schedule), from.Schedule),
            Modality = (JobModality)Enum.Parse(typeof(JobModality), from.Modality),
            Status = JobStatus.Open,
            Location = from.Location,
            Description = from.Description,
            RecruiterId = from.RecruiterId,
            SpecializationId = from.SpecializationId,
            JobSkills = from.Skills.Select(s => new JobSkill() { SkillId = s }).ToList(),
            JobLanguages = from.Languages.Select(languageId => new JobLanguage
            {
                LanguageId = languageId
            }).ToList()
        };
    }
}
