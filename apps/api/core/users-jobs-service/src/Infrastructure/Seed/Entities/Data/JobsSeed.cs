namespace Infrastructure.Seed.Entities.Data;

using Attributes.Ids;
using Domain.Entities.Jobs;
using Domain.Enums;
using Ids;
using SkInfrastructure.Seed;

internal sealed class JobsSeed() : BaseSeedEntity<Job>(DbPriority.Three)
{
    protected override IEnumerable<Job> GetData()
    {
        return
        [
            new Job
            {
                Id = JobsId.One,
                Title = "Senior Software Engineer",
                SalaryPerHour = 100,
                Schedule = Schedule.FullTime,
                Modality = JobModality.Remote,
                Status = JobStatus.Open,
                Description = "We are looking for a Senior Software Engineer to lead development.",
                Location = "Remote",
                RecruiterId = RecruitersId.One,
                SpecializationId = SpecializationsId.SoftwareEngineer,
            },
            new Job
            {
                Id = JobsId.Two,
                Title = "Junior Developer",
                SalaryPerHour = 70,
                Schedule = Schedule.PartTime,
                Modality = JobModality.Remote,
                Status = JobStatus.Open,
                Description =
                    "Seeking a Junior Developer to join our team and learn from the best.",
                Location = "New York",
                RecruiterId = RecruitersId.Two,
                SpecializationId = SpecializationsId.SoftwareEngineer,
            },
            new Job
            {
                Id = JobsId.Three,
                Title = "Data Analyst",
                SalaryPerHour = 65,
                Schedule = Schedule.FullTime,
                Modality = JobModality.OnSite,
                Status = JobStatus.Open,
                Description =
                    "Looking for a Data Analyst to extract insights from complex datasets.",
                Location = "San Francisco",
                RecruiterId = RecruitersId.Two,
                SpecializationId = SpecializationsId.DataScience,
            },
            new Job
            {
                Id = JobsId.Four,
                Title = "Marketing Specialist",
                SalaryPerHour = 80,
                Schedule = Schedule.FullTime,
                Modality = JobModality.OnSite,
                Status = JobStatus.Open,
                Description =
                    "We need a Marketing Specialist to manage campaigns and drive engagement.",
                Location = "Los Angeles",
                RecruiterId = RecruitersId.Three,
                SpecializationId = SpecializationsId.Marketing,
            },
            new Job
            {
                Id = JobsId.Five,
                Title = "UI/UX Designer",
                SalaryPerHour = 75,
                Schedule = Schedule.PartTime,
                Modality = JobModality.Remote,
                Status = JobStatus.Open,
                Description = "Join our team as a UI/UX Designer to improve user experience.",
                Location = "Austin",
                RecruiterId = RecruitersId.Four,
                SpecializationId = SpecializationsId.Design,
            },
            new Job
            {
                Id = JobsId.Six,
                Title = "Product Manager",
                SalaryPerHour = 95,
                Schedule = Schedule.FullTime,
                Modality = JobModality.Remote,
                Status = JobStatus.Open,
                Description =
                    "We are searching for a Product Manager to oversee product development.",
                Location = "Seattle",
                RecruiterId = RecruitersId.Four,
                SpecializationId = SpecializationsId.ProjectManagement,
            },
            new Job
            {
                Id = JobsId.Seven,
                Title = "Cybersecurity Analyst",
                SalaryPerHour = 85,
                Schedule = Schedule.FullTime,
                Modality = JobModality.Remote,
                Status = JobStatus.Open,
                Description = "Seeking a Cybersecurity Analyst to protect our company assets.",
                Location = "Remote",
                RecruiterId = RecruitersId.Five,
                SpecializationId = SpecializationsId.Cybersecurity,
            },
            new Job
            {
                Id = JobsId.Eight,
                Title = "Cloud Solutions Architect",
                SalaryPerHour = 90,
                Schedule = Schedule.PartTime,
                Modality = JobModality.OnSite,
                Status = JobStatus.Open,
                Description = "Join us as a Cloud Solutions Architect to design cloud strategies.",
                Location = "Chicago",
                RecruiterId = RecruitersId.Six,
                SpecializationId = SpecializationsId.CloudComputing,
            },
            new Job
            {
                Id = JobsId.Nine,
                Title = "DevOps Engineer",
                SalaryPerHour = 100,
                Schedule = Schedule.FullTime,
                Modality = JobModality.OnSite,
                Status = JobStatus.Open,
                Description = "Looking for a DevOps Engineer to streamline our processes.",
                Location = "Phoenix",
                RecruiterId = RecruitersId.Six,
                SpecializationId = SpecializationsId.DevOps,
            },
            new Job
            {
                Id = JobsId.Ten,
                Title = "Business Analyst",
                SalaryPerHour = 70,
                Schedule = Schedule.FullTime,
                Modality = JobModality.Remote,
                Status = JobStatus.Open,
                Description = "We need a Business Analyst to evaluate business needs.",
                Location = "Miami",
                RecruiterId = RecruitersId.Seven,
                SpecializationId = SpecializationsId.BusinessAnalysis,
            },
            new Job
            {
                Id = JobsId.Eleven,
                Title = "Content Creator",
                SalaryPerHour = 55,
                Schedule = Schedule.PartTime,
                Modality = JobModality.Remote,
                Status = JobStatus.Open,
                Description = "Join our team as a Content Creator to engage our audience.",
                Location = "San Diego",
                RecruiterId = RecruitersId.Seven,
                SpecializationId = SpecializationsId.ContentCreation,
            },
            new Job
            {
                Id = JobsId.Twelve,
                Title = "Quality Assurance Tester",
                SalaryPerHour = 60,
                Schedule = Schedule.FullTime,
                Modality = JobModality.OnSite,
                Status = JobStatus.Open,
                Description = "Looking for a QA Tester to ensure software quality.",
                Location = "Houston",
                RecruiterId = RecruitersId.Seven,
                SpecializationId = SpecializationsId.SoftwareEngineer,
            },
            new Job
            {
                Id = JobsId.Thirteen,
                Title = "SEO Specialist",
                SalaryPerHour = 70,
                Schedule = Schedule.FullTime,
                Modality = JobModality.Remote,
                Status = JobStatus.Open,
                Description = "We are hiring an SEO Specialist to enhance our online presence.",
                Location = "Orlando",
                RecruiterId = RecruitersId.Eight,
                SpecializationId = SpecializationsId.Marketing,
            },
            new Job
            {
                Id = JobsId.Fourteen,
                Title = "Data Scientist",
                SalaryPerHour = 95,
                Schedule = Schedule.PartTime,
                Modality = JobModality.Remote,
                Status = JobStatus.Open,
                Description =
                    "Seeking a Data Scientist to analyze data and provide actionable insights.",
                Location = "Denver",
                RecruiterId = RecruitersId.Nine,
                SpecializationId = SpecializationsId.DataScience,
            },
            new Job
            {
                Id = JobsId.Fifteen,
                Title = "Network Engineer",
                SalaryPerHour = 80,
                Schedule = Schedule.FullTime,
                Modality = JobModality.Remote,
                Status = JobStatus.Open,
                Description =
                    "Join our team as a Network Engineer to manage network infrastructures.",
                Location = "Philadelphia",
                RecruiterId = RecruitersId.Ten,
                SpecializationId = SpecializationsId.Cybersecurity,
            },
            new Job
            {
                Id = JobsId.Sixteen,
                Title = "Product Designer",
                SalaryPerHour = 75,
                Schedule = Schedule.FullTime,
                Modality = JobModality.OnSite,
                Status = JobStatus.Open,
                Description = "We need a Product Designer to create innovative product solutions.",
                Location = "Boston",
                RecruiterId = RecruitersId.Eleven,
                SpecializationId = SpecializationsId.Design,
            },
        ];
    }
}
