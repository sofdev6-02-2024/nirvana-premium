namespace Domain.Developers;

using Domain.Enums;
using Domain.Jobs;

public static class DeveloperExtensions
{
    public static IQueryable<Job> GetPreferredJobs(this Developer developer, IQueryable<Job> jobs)
    {
        jobs = jobs.Where(job => job.Status == JobStatus.Open);

        IOrderedQueryable<Job> preferredJobs = jobs.Where(job =>
                job.Modality == developer.ModalityPreferred
            )
            .Where(job => job.SalaryPerHour >= developer.SalaryPerHourExpected)
            .Where(job =>
                job.Skills.Any(skill => developer.Skills.Select(ds => ds.Name).Contains(skill.Name))
            )
            .Where(job =>
                job.Languages.Any(language =>
                    developer.Languages.Select(dl => dl.Name).Contains(language.Name)
                )
            )
            .OrderBy(job => job.CreatedAt);

        IQueryable<Job> nonPreferredJobs = jobs.Except(preferredJobs).OrderBy(job => job.CreatedAt);

        return preferredJobs.Concat(nonPreferredJobs);
    }
}
