namespace Domain.Tests.Developers;

using System;
using System.Collections.Generic;
using System.Linq;
using Domain.Developers;
using Domain.Enums;
using Domain.Jobs;

public class DeveloperTests
{
    [Fact]
    public void Should_Return_All_Preferred_Jobs_At_Top()
    {
        // Define Input and Output
        Developer developer =
            new()
            {
                Name = "John",
                LastName = "Doe",
                YearsOfExperience = 5,
                SalaryPerHourExpected = 50,
                ModalityPreferred = Modality.Virtual,
                Skills = [new() { Name = "C#" }],
                Languages = [new() { Name = "English" }],
                UserId = Guid.NewGuid(),
                SpecializationId = Guid.NewGuid(),
            };

        IQueryable<Job> jobs = new List<Job>
        {
            new()
            {
                Title = "Job1",
                Description = "Description1",
                SalaryPerHour = 60,
                DueDate = DateTime.Now.AddDays(10),
                CreatedAt = DateTime.Now,
                Modality = Modality.Virtual,
                Schedule = Schedule.FullTime,
                Status = JobStatus.Open,
                Skills = [new() { Name = "C#" }],
                Languages = [new() { Name = "English" }],
                RecruiterId = Guid.NewGuid(),
            },
            new()
            {
                Title = "Job2",
                Description = "Description2",
                SalaryPerHour = 40,
                DueDate = DateTime.Now.AddDays(10),
                CreatedAt = DateTime.Now,
                Modality = Modality.OnSite,
                Schedule = Schedule.PartTime,
                Status = JobStatus.Open,
                Skills = [new() { Name = "Java" }],
                Languages = [new() { Name = "Spanish" }],
                RecruiterId = Guid.NewGuid(),
            },
            new()
            {
                Title = "Job3",
                Description = "Description3",
                SalaryPerHour = 70,
                DueDate = DateTime.Now.AddDays(10),
                CreatedAt = DateTime.Now,
                Modality = Modality.Virtual,
                Schedule = Schedule.FullTime,
                Status = JobStatus.InProgress,
                Skills = [new() { Name = "C#" }],
                Languages = [new() { Name = "English" }],
                RecruiterId = Guid.NewGuid(),
            },
        }.AsQueryable();

        // Execute Actual Operation
        IList<Job> result = [.. developer.GetPreferredJobs(jobs)];

        // Verify Actual Result
        Assert.Equal(2, result.Count);
        Assert.Equal("Job1", result[0].Title);
        Assert.Equal("Job2", result[1].Title);
    }

    [Fact]
    public void Should_Only_Include_Open_Jobs()
    {
        // Define Input and Output
        Developer developer =
            new()
            {
                Name = "John",
                LastName = "Doe",
                YearsOfExperience = 5,
                SalaryPerHourExpected = 50,
                ModalityPreferred = Modality.Virtual,
                Skills = [new() { Name = "C#" }],
                Languages = [new() { Name = "English" }],
                UserId = Guid.NewGuid(),
                SpecializationId = Guid.NewGuid(),
            };

        IQueryable<Job> jobs = new List<Job>
        {
            new()
            {
                Title = "Job1",
                Description = "Description1",
                SalaryPerHour = 60,
                DueDate = DateTime.Now.AddDays(10),
                CreatedAt = DateTime.Now,
                Modality = Modality.Virtual,
                Schedule = Schedule.FullTime,
                Status = JobStatus.Open,
                Skills = [new() { Name = "C#" }],
                Languages = [new() { Name = "English" }],
                RecruiterId = Guid.NewGuid(),
            },
            new()
            {
                Title = "Job2",
                Description = "Description2",
                SalaryPerHour = 70,
                DueDate = DateTime.Now.AddDays(10),
                CreatedAt = DateTime.Now,
                Modality = Modality.Virtual,
                Schedule = Schedule.FullTime,
                Status = JobStatus.InProgress,
                Skills = [new() { Name = "C#" }],
                Languages = [new() { Name = "English" }],
                RecruiterId = Guid.NewGuid(),
            },
        }.AsQueryable();

        // Execute Actual Operation
        IList<Job> result = [.. developer.GetPreferredJobs(jobs)];

        // Verify Actual Result
        _ = Assert.Single(result);
        Assert.Equal("Job1", result[0].Title);
    }

    [Fact]
    public void Should_Filter_By_ModalityPreferred()
    {
        // Define Input and Output
        Developer developer =
            new()
            {
                Name = "John",
                LastName = "Doe",
                YearsOfExperience = 5,
                SalaryPerHourExpected = 50,
                ModalityPreferred = Modality.Virtual,
                Skills = [new() { Name = "C#" }],
                Languages = [new() { Name = "English" }],
                UserId = Guid.NewGuid(),
                SpecializationId = Guid.NewGuid(),
            };

        IQueryable<Job> jobs = new List<Job>
        {
            new()
            {
                Title = "Job1",
                Description = "Description1",
                SalaryPerHour = 60,
                DueDate = DateTime.Now.AddDays(10),
                CreatedAt = DateTime.Now,
                Modality = Modality.Virtual,
                Schedule = Schedule.FullTime,
                Status = JobStatus.Open,
                Skills = [new() { Name = "C#" }],
                Languages = [new() { Name = "English" }],
                RecruiterId = Guid.NewGuid(),
            },
            new()
            {
                Title = "Job2",
                Description = "Description2",
                SalaryPerHour = 80,
                DueDate = DateTime.Now.AddDays(10),
                CreatedAt = DateTime.Now,
                Modality = Modality.OnSite,
                Schedule = Schedule.FullTime,
                Status = JobStatus.Open,
                Skills = [new() { Name = "C#" }],
                Languages = [new() { Name = "English" }],
                RecruiterId = Guid.NewGuid(),
            },
        }.AsQueryable();

        // Execute Actual Operation
        IList<Job> result = [.. developer.GetPreferredJobs(jobs)];

        // Verify Actual Result
        Assert.Equal("Job1", result[0].Title);
        Assert.Equal("Job2", result[1].Title);
    }

    [Fact]
    public void Should_Filter_By_Skills()
    {
        // Define Input and Output
        Developer developer =
            new()
            {
                Name = "John",
                LastName = "Doe",
                YearsOfExperience = 5,
                SalaryPerHourExpected = 50,
                ModalityPreferred = Modality.Virtual,
                Skills = [new() { Name = "C#" }, new() { Name = "JavaScript" }],
                Languages = [new() { Name = "English" }],
                UserId = Guid.NewGuid(),
                SpecializationId = Guid.NewGuid(),
            };

        IQueryable<Job> jobs = new List<Job>
        {
            new()
            {
                Title = "Job1",
                Description = "Description1",
                SalaryPerHour = 60,
                DueDate = DateTime.Now.AddDays(10),
                CreatedAt = DateTime.Now,
                Modality = Modality.Virtual,
                Schedule = Schedule.FullTime,
                Status = JobStatus.Open,
                Skills = [new() { Name = "C#" }, new() { Name = "JavaScript" }],
                Languages = [new() { Name = "English" }],
                RecruiterId = Guid.NewGuid(),
            },
            new()
            {
                Title = "Job2",
                Description = "Description2",
                SalaryPerHour = 80,
                DueDate = DateTime.Now.AddDays(10),
                CreatedAt = DateTime.Now,
                Modality = Modality.Virtual,
                Schedule = Schedule.FullTime,
                Status = JobStatus.Open,
                Skills = [new() { Name = "Java" }],
                Languages = [new() { Name = "English" }],
                RecruiterId = Guid.NewGuid(),
            },
        }.AsQueryable();

        // Execute Actual Operation
        IList<Job> result = [.. developer.GetPreferredJobs(jobs)];

        // Verify Actual Result
        Assert.Equal("Job1", result[0].Title);
        Assert.Equal("Job2", result[1].Title);
    }

    [Fact]
    public void Should_Filter_By_Languages()
    {
        // Define Input and Output
        Developer developer =
            new()
            {
                Name = "John",
                LastName = "Doe",
                YearsOfExperience = 5,
                SalaryPerHourExpected = 50,
                ModalityPreferred = Modality.Virtual,
                Skills = [new() { Name = "C#" }],
                Languages = [new() { Name = "English" }, new() { Name = "Spanish" }],
                UserId = Guid.NewGuid(),
                SpecializationId = Guid.NewGuid(),
            };

        IQueryable<Job> jobs = new List<Job>
        {
            new()
            {
                Title = "Job1",
                Description = "Description1",
                SalaryPerHour = 60,
                DueDate = DateTime.Now.AddDays(10),
                CreatedAt = DateTime.Now,
                Modality = Modality.Virtual,
                Schedule = Schedule.FullTime,
                Status = JobStatus.Open,
                Skills = [new() { Name = "C#" }],
                Languages = [new() { Name = "English" }, new() { Name = "Spanish" }],
                RecruiterId = Guid.NewGuid(),
            },
            new()
            {
                Title = "Job2",
                Description = "Description2",
                SalaryPerHour = 80,
                DueDate = DateTime.Now.AddDays(10),
                CreatedAt = DateTime.Now,
                Modality = Modality.Virtual,
                Schedule = Schedule.FullTime,
                Status = JobStatus.Open,
                Skills = [new() { Name = "C#" }],
                Languages = [new() { Name = "French" }],
                RecruiterId = Guid.NewGuid(),
            },
        }.AsQueryable();

        // Execute Actual Operation
        IList<Job> result = [.. developer.GetPreferredJobs(jobs)];

        // Verify Actual Result
        Assert.Equal("Job1", result[0].Title);
        Assert.Equal("Job2", result[1].Title);
    }

    [Fact]
    public void Should_Handle_Multiple_Skills_And_Languages()
    {
        // Define Input and Output
        Developer developer =
            new()
            {
                Name = "John",
                LastName = "Doe",
                YearsOfExperience = 5,
                SalaryPerHourExpected = 50,
                ModalityPreferred = Modality.Virtual,
                Skills = [new() { Name = "C#" }, new() { Name = "JavaScript" }],
                Languages = [new() { Name = "English" }, new() { Name = "Spanish" }],
                UserId = Guid.NewGuid(),
                SpecializationId = Guid.NewGuid(),
            };

        IQueryable<Job> jobs = new List<Job>
        {
            new()
            {
                Title = "Job1",
                Description = "Description1",
                SalaryPerHour = 60,
                DueDate = DateTime.Now.AddDays(10),
                CreatedAt = DateTime.Now,
                Modality = Modality.Virtual,
                Schedule = Schedule.FullTime,
                Status = JobStatus.Open,
                Skills = [new() { Name = "C#" }, new() { Name = "JavaScript" }],
                Languages = [new() { Name = "English" }, new() { Name = "Spanish" }],
                RecruiterId = Guid.NewGuid(),
            },
            new()
            {
                Title = "Job2",
                Description = "Description2",
                SalaryPerHour = 80,
                DueDate = DateTime.Now.AddDays(10),
                CreatedAt = DateTime.Now,
                Modality = Modality.Virtual,
                Schedule = Schedule.FullTime,
                Status = JobStatus.Open,
                Skills = [new() { Name = "Java" }],
                Languages = [new() { Name = "English" }],
                RecruiterId = Guid.NewGuid(),
            },
            new()
            {
                Title = "Job3",
                Description = "Description3",
                SalaryPerHour = 70,
                DueDate = DateTime.Now.AddDays(10),
                CreatedAt = DateTime.Now,
                Modality = Modality.Virtual,
                Schedule = Schedule.FullTime,
                Status = JobStatus.Open,
                Skills = [new() { Name = "C#" }, new() { Name = "JavaScript" }],
                Languages = [new() { Name = "English" }],
                RecruiterId = Guid.NewGuid(),
            },
        }.AsQueryable();

        // Execute Actual Operation
        IList<Job> result = [.. developer.GetPreferredJobs(jobs)];

        // Verify Actual Result
        Assert.Equal(3, result.Count);
        Assert.Equal("Job1", result[0].Title);
        Assert.Equal("Job3", result[1].Title);
        Assert.Equal("Job2", result[2].Title);
    }
}