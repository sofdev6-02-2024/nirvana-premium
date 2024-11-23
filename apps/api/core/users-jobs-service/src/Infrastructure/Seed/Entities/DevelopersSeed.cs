namespace Infrastructure.Seed.Entities;

using Domain.Entities.Developers;
using Domain.Enums;
using SkInfrastructure.Seed;

internal sealed class DevelopersSeed() : BaseSeedEntity<Developer>(DbPriority.Two)
{
    private static readonly Uri PortfolioUrl = new("https://www.google.com/");
    private static readonly Uri ProfilePictureUrl =
        new(
            "https://bairesdev.mo.cloudinary.net/blog/2022/08/portrait-of-a-man-using-a-computer-in-a-modern-office-picture-id1344688156-1.jpg"
        );

    protected override IEnumerable<Developer> GetData()
    {
        return
        [
            new Developer
            {
                Id = Guid.Parse("28cca042-ba83-405a-b4cf-8e4c55e2493d"),
                UserId = Guid.Parse("04eba753-86b6-4575-9308-52933fd3494d"),
                Name = "John",
                LastName = "Doe",
                Description = "Experienced Software Engineer",
                YearsOfExperience = 5,
                SalaryPerHourExpected = 75,
                ModalityPreferred = DeveloperModality.Remote,
                Location = "New York",
                PortfolioUrl = PortfolioUrl,
                ProfilePictureUrl = ProfilePictureUrl,
                SpecializationId = Guid.Parse("1069c934-28f4-44c1-9195-6c75acce64f3"),
            },
            new Developer
            {
                Id = Guid.Parse("3a1f2e5d-6b4c-4f1a-9e2d-5c7b8f9d3a6e"),
                UserId = Guid.Parse("d5632548-07d2-451c-ab49-08332e6d7d5d"),
                Name = "Jane",
                LastName = "Smith",
                Description = "Skilled Data Scientist",
                YearsOfExperience = 3,
                SalaryPerHourExpected = 60,
                ModalityPreferred = DeveloperModality.OnSite,
                Location = "Los Angeles",
                PortfolioUrl = PortfolioUrl,
                ProfilePictureUrl = ProfilePictureUrl,
                SpecializationId = Guid.Parse("9bbddc30-f2e1-4af1-b711-d4f3717b9cfc"),
            },
            new Developer
            {
                Id = Guid.Parse("7d9e3f1c-5a2b-4e6d-9c3f-2b8d5a7e4c6f"),
                UserId = Guid.Parse("a4db4e7a-9984-4392-a51f-3d5dea04968c"),
                Name = "Alex",
                LastName = "Taylor",
                Description = "Creative Marketing Specialist",
                YearsOfExperience = 4,
                SalaryPerHourExpected = 65,
                ModalityPreferred = DeveloperModality.Remote,
                Location = "Chicago",
                PortfolioUrl = PortfolioUrl,
                ProfilePictureUrl = ProfilePictureUrl,
                SpecializationId = Guid.Parse("ac1d8e38-66c5-4879-862a-57f8a7d23496"),
            },
            new Developer
            {
                Id = Guid.Parse("5c6d2f3a-9e1b-4a7d-8c2f-6b9d3e1a5c4f"),
                UserId = Guid.Parse("7366c6e1-4eba-4c78-bdce-a031f896f5a2"),
                Name = "Emily",
                LastName = "Clark",
                Description = "UI/UX Designer",
                YearsOfExperience = 6,
                SalaryPerHourExpected = 70,
                ModalityPreferred = DeveloperModality.OnSite,
                Location = "Austin",
                PortfolioUrl = PortfolioUrl,
                ProfilePictureUrl = ProfilePictureUrl,
                SpecializationId = Guid.Parse("978db297-3bd1-4559-bd04-758c554089f5"),
            },
            new Developer
            {
                Id = Guid.Parse("2e1f4a7d-9c3b-4f6e-8a2d-5b7f3c1e6d9a"),
                UserId = Guid.Parse("567ae4fe-6118-4183-a094-b543b5504361"),
                Name = "Michael",
                LastName = "Brown",
                Description = "Project Manager",
                YearsOfExperience = 7,
                SalaryPerHourExpected = 80,
                ModalityPreferred = DeveloperModality.Remote,
                Location = "Seattle",
                PortfolioUrl = PortfolioUrl,
                ProfilePictureUrl = ProfilePictureUrl,
                SpecializationId = Guid.Parse("aab6d12f-c562-4c28-9fad-8985520ab90c"),
            },
            new Developer
            {
                Id = Guid.Parse("9c3f2d6a-5b1e-4a7d-8e2f-6d9c4b3f1a5e"),
                UserId = Guid.Parse("ed519d80-7d95-4f42-9239-fa742777afc8"),
                Name = "Sarah",
                LastName = "Lee",
                Description = "Cybersecurity Expert",
                YearsOfExperience = 5,
                SalaryPerHourExpected = 90,
                ModalityPreferred = DeveloperModality.OnSite,
                Location = "Denver",
                PortfolioUrl = PortfolioUrl,
                ProfilePictureUrl = ProfilePictureUrl,
                SpecializationId = Guid.Parse("7d3228ee-0050-4fe9-89d4-554f7a4e4f65"),
            },
            new Developer
            {
                Id = Guid.Parse("4d6f2a9c-3b1e-4f5d-8e7a-2c6b9d3f1a4e"),
                UserId = Guid.Parse("3cf7872d-2e6c-4767-b612-f5325db2637e"),
                Name = "Chris",
                LastName = "Wilson",
                Description = "Cloud Computing Enthusiast",
                YearsOfExperience = 2,
                SalaryPerHourExpected = 55,
                ModalityPreferred = DeveloperModality.Remote,
                Location = "Remote",
                PortfolioUrl = PortfolioUrl,
                ProfilePictureUrl = ProfilePictureUrl,
                SpecializationId = Guid.Parse("c0366c99-cfa1-4ead-890d-cad31902c976"),
            },
            new Developer
            {
                Id = Guid.Parse("6a3d9c2f-5b1e-4e7a-8f2d-9c4b3f1a5d6e"),
                UserId = Guid.Parse("b5b277ac-9a62-4c11-8b30-759af7f8b48b"),
                Name = "Olivia",
                LastName = "Martinez",
                Description = "DevOps Specialist",
                YearsOfExperience = 3,
                SalaryPerHourExpected = 60,
                ModalityPreferred = DeveloperModality.OnSite,
                Location = "San Diego",
                PortfolioUrl = PortfolioUrl,
                ProfilePictureUrl = ProfilePictureUrl,
                SpecializationId = Guid.Parse("1d10f1cc-069a-4702-9c17-efb3cc64fac4"),
            },
            new Developer
            {
                Id = Guid.Parse("1e6f4a3d-9c2b-4f5e-8d7a-2b6c3f1a5d9e"),
                UserId = Guid.Parse("0d971e63-6891-4dea-9e68-125176e56033"),
                Name = "David",
                LastName = "Garcia",
                Description = "Business Analyst",
                YearsOfExperience = 8,
                SalaryPerHourExpected = 85,
                ModalityPreferred = DeveloperModality.Remote,
                Location = "Phoenix",
                PortfolioUrl = PortfolioUrl,
                ProfilePictureUrl = ProfilePictureUrl,
                SpecializationId = Guid.Parse("7705164b-4749-4e27-ab21-85cd69f40925"),
            },
            new Developer
            {
                Id = Guid.Parse("5d6f3a9c-2b1e-4e7a-8f4d-9c3b1a5d6f2e"),
                UserId = Guid.Parse("8ee72569-f38d-4ac3-b4e9-91b2676dc17f"),
                Name = "Laura",
                LastName = "Davis",
                Description = "Content Creator",
                YearsOfExperience = 1,
                SalaryPerHourExpected = 50,
                ModalityPreferred = DeveloperModality.OnSite,
                Location = "Houston",
                PortfolioUrl = PortfolioUrl,
                ProfilePictureUrl = ProfilePictureUrl,
                SpecializationId = Guid.Parse("17631e14-57c7-41e9-8c1f-7631b424a3a8"),
            },
            new Developer
            {
                Id = Guid.Parse("3d6f1a9c-2b4e-4f5a-8e7d-2c6b3f1a5d9e"),
                UserId = Guid.Parse("33210350-a20d-4bb3-912d-723bf3d1c537"),
                Name = "Daniel",
                LastName = "Moore",
                Description = "Quality Assurance Engineer",
                YearsOfExperience = 4,
                SalaryPerHourExpected = 68,
                ModalityPreferred = DeveloperModality.Remote,
                Location = "Boston",
                PortfolioUrl = PortfolioUrl,
                ProfilePictureUrl = ProfilePictureUrl,
                SpecializationId = Guid.Parse("1069c934-28f4-44c1-9195-6c75acce64f3"),
            },
            new Developer
            {
                Id = Guid.Parse("6d3f1a9c-2b5e-4e7a-8f4d-9c2b3f1a5d6e"),
                UserId = Guid.Parse("c36f135d-7ea2-4c8e-b240-047054013e29"),
                Name = "Sophia",
                LastName = "Lopez",
                Description = "UX Researcher",
                YearsOfExperience = 6,
                SalaryPerHourExpected = 73,
                ModalityPreferred = DeveloperModality.OnSite,
                Location = "Philadelphia",
                PortfolioUrl = PortfolioUrl,
                ProfilePictureUrl = ProfilePictureUrl,
                SpecializationId = Guid.Parse("978db297-3bd1-4559-bd04-758c554089f5"),
            },
            new Developer
            {
                Id = Guid.Parse("2d6f3a9c-1b4e-4f5a-8e7d-9c2b1a5d6f3e"),
                UserId = Guid.Parse("9cb663cd-5c63-47c2-bb26-6369dc6eb1c3"),
                Name = "James",
                LastName = "Miller",
                Description = "Junior Developer",
                YearsOfExperience = 2,
                SalaryPerHourExpected = 65,
                ModalityPreferred = DeveloperModality.Remote,
                Location = "San Antonio",
                PortfolioUrl = PortfolioUrl,
                ProfilePictureUrl = ProfilePictureUrl,
                SpecializationId = Guid.Parse("1069c934-28f4-44c1-9195-6c75acce64f3"),
            },
            new Developer
            {
                Id = Guid.Parse("9d3f1a6c-2b5e-4e7a-8f4d-2c6b3f1a5d9e"),
                UserId = Guid.Parse("02156345-a6a8-4fbf-8a50-8617dd994559"),
                Name = "Emma",
                LastName = "Anderson",
                Description = "Data Engineer",
                YearsOfExperience = 9,
                SalaryPerHourExpected = 95,
                ModalityPreferred = DeveloperModality.OnSite,
                Location = "Dallas",
                PortfolioUrl = PortfolioUrl,
                ProfilePictureUrl = ProfilePictureUrl,
                SpecializationId = Guid.Parse("9bbddc30-f2e1-4af1-b711-d4f3717b9cfc"),
            },
            new Developer
            {
                Id = Guid.Parse("4d6f3a9c-1b5e-4e7a-8f2d-9c2b1a5d6f4e"),
                UserId = Guid.Parse("825a9f03-9b9f-4eb0-b312-b90ce6d88a3b"),
                Name = "Liam",
                LastName = "Thomas",
                Description = "Senior DevOps Engineer",
                YearsOfExperience = 7,
                SalaryPerHourExpected = 78,
                ModalityPreferred = DeveloperModality.Remote,
                Location = "Miami",
                PortfolioUrl = PortfolioUrl,
                ProfilePictureUrl = ProfilePictureUrl,
                SpecializationId = Guid.Parse("1d10f1cc-069a-4702-9c17-efb3cc64fac4"),
            },
        ];
    }
}
