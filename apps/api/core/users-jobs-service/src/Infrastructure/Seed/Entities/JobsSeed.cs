namespace Infrastructure.Seed.Entities;

using Domain.Entities.Jobs;
using Domain.Enums;
using SkInfrastructure.Seed;

internal sealed class JobsSeed() : BaseSeedEntity<Job>(DbPriority.Three)
{
    protected override IEnumerable<Job> GetData()
    {
        return
        [
            new Job
            {
                Id = Guid.Parse("9c4b0e8b-2223-476a-969b-dfb84b5a9e55"),
                Title = "Senior Software Engineer",
                SalaryPerHour = 100,
                Schedule = Schedule.FullTime,
                Modality = JobModality.Remote,
                Status = JobStatus.Open,
                Description = "We are looking for a Senior Software Engineer to lead development.",
                Location = "Remote",
                RecruiterId = Guid.Parse("5173114e-0bf6-492f-8e73-b2f3f9f6c6b6"),
                SpecializationId = Guid.Parse("1069c934-28f4-44c1-9195-6c75acce64f3"),
            },
            new Job
            {
                Id = Guid.Parse("6f9ad046-f940-426d-a890-58d53e737c4a"),
                Title = "Junior Developer",
                SalaryPerHour = 70,
                Schedule = Schedule.PartTime,
                Modality = JobModality.Remote,
                Status = JobStatus.Open,
                Description =
                    "Seeking a Junior Developer to join our team and learn from the best.",
                Location = "New York",
                RecruiterId = Guid.Parse("5173114e-0bf6-492f-8e73-b2f3f9f6c6b6"),
                SpecializationId = Guid.Parse("1069c934-28f4-44c1-9195-6c75acce64f3"),
            },
            new Job
            {
                Id = Guid.Parse("d891a411-31c7-43d6-8f04-2ec00c74a45a"),
                Title = "Data Analyst",
                SalaryPerHour = 65,
                Schedule = Schedule.FullTime,
                Modality = JobModality.OnSite,
                Status = JobStatus.Open,
                Description =
                    "Looking for a Data Analyst to extract insights from complex datasets.",
                Location = "San Francisco",
                RecruiterId = Guid.Parse("fd5e83e5-4d50-4467-93a4-896165a9a1e0"),
                SpecializationId = Guid.Parse("9bbddc30-f2e1-4af1-b711-d4f3717b9cfc"),
            },
            new Job
            {
                Id = Guid.Parse("7528bc02-234f-4b46-ac25-bfb5c65eebee"),
                Title = "Marketing Specialist",
                SalaryPerHour = 80,
                Schedule = Schedule.FullTime,
                Modality = JobModality.OnSite,
                Status = JobStatus.Open,
                Description =
                    "We need a Marketing Specialist to manage campaigns and drive engagement.",
                Location = "Los Angeles",
                RecruiterId = Guid.Parse("3bd80358-e7d1-4fa5-9f80-fe54f83ae7d6"),
                SpecializationId = Guid.Parse("ac1d8e38-66c5-4879-862a-57f8a7d23496"),
            },
            new Job
            {
                Id = Guid.Parse("53a414d8-ddc3-4cc7-8b8d-a56b11544359"),
                Title = "UI/UX Designer",
                SalaryPerHour = 75,
                Schedule = Schedule.PartTime,
                Modality = JobModality.Remote,
                Status = JobStatus.Open,
                Description = "Join our team as a UI/UX Designer to improve user experience.",
                Location = "Austin",
                RecruiterId = Guid.Parse("3bd80358-e7d1-4fa5-9f80-fe54f83ae7d6"),
                SpecializationId = Guid.Parse("978db297-3bd1-4559-bd04-758c554089f5"),
            },
            new Job
            {
                Id = Guid.Parse("862e4d1a-80a2-4472-bdc9-ebafc09512bd"),
                Title = "Product Manager",
                SalaryPerHour = 95,
                Schedule = Schedule.FullTime,
                Modality = JobModality.Remote,
                Status = JobStatus.Open,
                Description =
                    "We are searching for a Product Manager to oversee product development.",
                Location = "Seattle",
                RecruiterId = Guid.Parse("fc0011f1-4bc7-41dc-b1d4-881187cb2f0a"),
                SpecializationId = Guid.Parse("aab6d12f-c562-4c28-9fad-8985520ab90c"),
            },
            new Job
            {
                Id = Guid.Parse("31f3e694-cf8e-4afe-9ca5-86ad2d0713fa"),
                Title = "Cybersecurity Analyst",
                SalaryPerHour = 85,
                Schedule = Schedule.FullTime,
                Modality = JobModality.Remote,
                Status = JobStatus.Open,
                Description = "Seeking a Cybersecurity Analyst to protect our company assets.",
                Location = "Remote",
                RecruiterId = Guid.Parse("fc0011f1-4bc7-41dc-b1d4-881187cb2f0a"),
                SpecializationId = Guid.Parse("7d3228ee-0050-4fe9-89d4-554f7a4e4f65"),
            },
            new Job
            {
                Id = Guid.Parse("90371446-9690-4bcc-a782-12eab9738a6a"),
                Title = "Cloud Solutions Architect",
                SalaryPerHour = 90,
                Schedule = Schedule.PartTime,
                Modality = JobModality.OnSite,
                Status = JobStatus.Open,
                Description = "Join us as a Cloud Solutions Architect to design cloud strategies.",
                Location = "Chicago",
                RecruiterId = Guid.Parse("fc0011f1-4bc7-41dc-b1d4-881187cb2f0a"),
                SpecializationId = Guid.Parse("c0366c99-cfa1-4ead-890d-cad31902c976"),
            },
            new Job
            {
                Id = Guid.Parse("0f900413-fe73-4c8d-b11c-d4d450e9eaf6"),
                Title = "DevOps Engineer",
                SalaryPerHour = 100,
                Schedule = Schedule.FullTime,
                Modality = JobModality.OnSite,
                Status = JobStatus.Open,
                Description = "Looking for a DevOps Engineer to streamline our processes.",
                Location = "Phoenix",
                RecruiterId = Guid.Parse("c7ca402c-fbb2-4d45-a284-8b118724b182"),
                SpecializationId = Guid.Parse("1d10f1cc-069a-4702-9c17-efb3cc64fac4"),
            },
            new Job
            {
                Id = Guid.Parse("270888c9-4f0c-495f-b7c2-223621954492"),
                Title = "Business Analyst",
                SalaryPerHour = 70,
                Schedule = Schedule.FullTime,
                Modality = JobModality.Remote,
                Status = JobStatus.Open,
                Description = "We need a Business Analyst to evaluate business needs.",
                Location = "Miami",
                RecruiterId = Guid.Parse("28e5ff9f-2e54-41ec-809e-88784acab38b"),
                SpecializationId = Guid.Parse("7705164b-4749-4e27-ab21-85cd69f40925"),
            },
            new Job
            {
                Id = Guid.Parse("6e8665cc-6cac-43e3-a759-c0de200c575a"),
                Title = "Content Creator",
                SalaryPerHour = 55,
                Schedule = Schedule.PartTime,
                Modality = JobModality.Remote,
                Status = JobStatus.Open,
                Description = "Join our team as a Content Creator to engage our audience.",
                Location = "San Diego",
                RecruiterId = Guid.Parse("42f8d5e4-5abb-4079-b1c6-4b6c0cc2eeab"),
                SpecializationId = Guid.Parse("17631e14-57c7-41e9-8c1f-7631b424a3a8"),
            },
            new Job
            {
                Id = Guid.Parse("f5287e1d-da17-4a2a-aeb1-6fc38d3cd6de"),
                Title = "Quality Assurance Tester",
                SalaryPerHour = 60,
                Schedule = Schedule.FullTime,
                Modality = JobModality.OnSite,
                Status = JobStatus.Open,
                Description = "Looking for a QA Tester to ensure software quality.",
                Location = "Houston",
                RecruiterId = Guid.Parse("42f8d5e4-5abb-4079-b1c6-4b6c0cc2eeab"),
                SpecializationId = Guid.Parse("1069c934-28f4-44c1-9195-6c75acce64f3"),
            },
            new Job
            {
                Id = Guid.Parse("45691d64-0942-44e7-8a87-312ba019ff7a"),
                Title = "SEO Specialist",
                SalaryPerHour = 70,
                Schedule = Schedule.FullTime,
                Modality = JobModality.Remote,
                Status = JobStatus.Open,
                Description = "We are hiring an SEO Specialist to enhance our online presence.",
                Location = "Orlando",
                RecruiterId = Guid.Parse("4df3b8d6-0e09-47b0-b322-2a0378a33ba6"),
                SpecializationId = Guid.Parse("ac1d8e38-66c5-4879-862a-57f8a7d23496"),
            },
            new Job
            {
                Id = Guid.Parse("7a0f64eb-b872-4281-a0c2-e18147d29d88"),
                Title = "Data Scientist",
                SalaryPerHour = 95,
                Schedule = Schedule.PartTime,
                Modality = JobModality.Remote,
                Status = JobStatus.Open,
                Description =
                    "Seeking a Data Scientist to analyze data and provide actionable insights.",
                Location = "Denver",
                RecruiterId = Guid.Parse("4df3b8d6-0e09-47b0-b322-2a0378a33ba6"),
                SpecializationId = Guid.Parse("9bbddc30-f2e1-4af1-b711-d4f3717b9cfc"),
            },
            new Job
            {
                Id = Guid.Parse("b4dc37bd-b940-4d45-bc87-c207f389fce9"),
                Title = "Network Engineer",
                SalaryPerHour = 80,
                Schedule = Schedule.FullTime,
                Modality = JobModality.Remote,
                Status = JobStatus.Open,
                Description =
                    "Join our team as a Network Engineer to manage network infrastructures.",
                Location = "Philadelphia",
                RecruiterId = Guid.Parse("e866d88a-5f46-43cb-bf39-15ca94e85ca4"),
                SpecializationId = Guid.Parse("7d3228ee-0050-4fe9-89d4-554f7a4e4f65"),
            },
            new Job
            {
                Id = Guid.Parse("9caa8da0-cd83-488a-877c-e55b36822e84"),
                Title = "Product Designer",
                SalaryPerHour = 75,
                Schedule = Schedule.FullTime,
                Modality = JobModality.OnSite,
                Status = JobStatus.Open,
                Description = "We need a Product Designer to create innovative product solutions.",
                Location = "Boston",
                RecruiterId = Guid.Parse("e866d88a-5f46-43cb-bf39-15ca94e85ca4"),
                SpecializationId = Guid.Parse("978db297-3bd1-4559-bd04-758c554089f5"),
            },
        ];
    }
}
