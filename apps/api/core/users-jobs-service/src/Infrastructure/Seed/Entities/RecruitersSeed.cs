namespace Infrastructure.Seed.Entities;

using Domain.Entities.Recruiters;
using SkInfrastructure.Seed;

internal sealed class RecruitersSeed() : BaseSeedEntity<Recruiter>(DbPriority.Two)
{
    private static readonly Uri ProfilePictureUrl =
        new("https://img.freepik.com/free-vector/gradient-code-logo-template_23-2148825387.jpg");

    protected override IEnumerable<Recruiter> GetData()
    {
        return
        [
            new Recruiter
            {
                Id = Guid.Parse("5173114e-0bf6-492f-8e73-b2f3f9f6c6b6"),
                UserId = Guid.Parse("b96d1b8f-c0e3-47fb-97fa-0f034ce98769"),
                Name = "Alice Johnson",
                Location = "San Francisco",
                Description = "Tech Recruiter specializing in IT roles",
                ProfilePictureUrl = ProfilePictureUrl,
                IsVerified = true,
            },
            new Recruiter
            {
                Id = Guid.Parse("fd5e83e5-4d50-4467-93a4-896165a9a1e0"),
                UserId = Guid.Parse("948c059b-4524-4a0a-9915-1eeab5784959"),
                Name = "Bob Lee",
                Location = "New York",
                Description = "Healthcare Recruiter",
                ProfilePictureUrl = ProfilePictureUrl,
                IsVerified = true,
            },
            new Recruiter
            {
                Id = Guid.Parse("3bd80358-e7d1-4fa5-9f80-fe54f83ae7d6"),
                UserId = Guid.Parse("663a7ff2-f7f7-43c7-83b3-f53b9fbfc950"),
                Name = "Cathy Wright",
                Location = "Miami",
                Description = "Finance Industry Recruiter",
                ProfilePictureUrl = ProfilePictureUrl,
                IsVerified = true,
            },
            new Recruiter
            {
                Id = Guid.Parse("fc0011f1-4bc7-41dc-b1d4-881187cb2f0a"),
                UserId = Guid.Parse("17d635c0-46a9-4907-ab71-f84b87cc42e1"),
                Name = "David Scott",
                Location = "Houston",
                Description = "Education and Research Recruiter",
                ProfilePictureUrl = ProfilePictureUrl,
                IsVerified = true,
            },
            new Recruiter
            {
                Id = Guid.Parse("c7ca402c-fbb2-4d45-a284-8b118724b182"),
                UserId = Guid.Parse("65dbc8bc-6c59-46dd-9b04-7c0cc30cd8bc"),
                Name = "Ella Ray",
                Location = "Chicago",
                Description = "Engineering Recruiter",
                ProfilePictureUrl = ProfilePictureUrl,
                IsVerified = true,
            },
            new Recruiter
            {
                Id = Guid.Parse("28e5ff9f-2e54-41ec-809e-88784acab38b"),
                UserId = Guid.Parse("32b9cafe-9106-4727-b864-5c829bfca883"),
                Name = "Frank Brown",
                Location = "Dallas",
                Description = "Experienced Recruiter in Oil & Gas Industry",
                ProfilePictureUrl = ProfilePictureUrl,
                IsVerified = true,
            },
            new Recruiter
            {
                Id = Guid.Parse("42f8d5e4-5abb-4079-b1c6-4b6c0cc2eeab"),
                UserId = Guid.Parse("b9e8e393-9f41-4af8-b3a8-6926908b8562"),
                Name = "Grace Kim",
                Location = "San Diego",
                Description = "Digital Marketing Recruiter",
                ProfilePictureUrl = ProfilePictureUrl,
                IsVerified = true,
            },
            new Recruiter
            {
                Id = Guid.Parse("4df3b8d6-0e09-47b0-b322-2a0378a33ba6"),
                UserId = Guid.Parse("0641ba75-8890-4a04-97db-50921078b6fc"),
                Name = "Henry Patel",
                Location = "Phoenix",
                Description = "Legal Industry Recruiter",
                ProfilePictureUrl = ProfilePictureUrl,
                IsVerified = true,
            },
            new Recruiter
            {
                Id = Guid.Parse("e866d88a-5f46-43cb-bf39-15ca94e85ca4"),
                UserId = Guid.Parse("408f86b6-387c-4f25-a5b6-f9bbc141b845"),
                Name = "Isabel Martinez",
                Location = "Philadelphia",
                Description = "Government Sector Recruiter",
                ProfilePictureUrl = ProfilePictureUrl,
                IsVerified = true,
            },
            new Recruiter
            {
                Id = Guid.Parse("0e9ace72-34d3-42ca-a1d7-0702f2508e33"),
                UserId = Guid.Parse("4c6b3d04-bba4-46d6-be91-7e1c4138e65e"),
                Name = "Jack Young",
                Location = "Austin",
                Description = "IT and Cybersecurity Recruiter",
                ProfilePictureUrl = ProfilePictureUrl,
                IsVerified = true,
            },
            new Recruiter
            {
                Id = Guid.Parse("bcba3a25-7339-4e8f-a770-6f330a5adda3"),
                UserId = Guid.Parse("d862feaf-9724-4d77-b8c9-c9954509ed44"),
                Name = "Karen Nguyen",
                Location = "San Jose",
                Description = "Healthcare and Biotech Recruiter",
                ProfilePictureUrl = ProfilePictureUrl,
                IsVerified = true,
            },
            new Recruiter
            {
                Id = Guid.Parse("e10cd7f4-01b9-4859-8345-5250ef443e80"),
                UserId = Guid.Parse("6589cd98-a925-478d-812a-761f92d877dd"),
                Name = "Louis Bell",
                Location = "Las Vegas",
                Description = "Manufacturing Industry Recruiter",
                ProfilePictureUrl = ProfilePictureUrl,
                IsVerified = true,
            },
            new Recruiter
            {
                Id = Guid.Parse("9854afdc-c392-4c42-8893-8a8d92759c00"),
                UserId = Guid.Parse("a70f3710-28b1-4a46-9840-f770867ce90c"),
                Name = "Mia Lopez",
                Location = "Orlando",
                Description = "Freelance Creative Recruiter",
                ProfilePictureUrl = ProfilePictureUrl,
                IsVerified = true,
            },
            new Recruiter
            {
                Id = Guid.Parse("bd6df320-a80e-4aa1-899a-f6556df3d94d"),
                UserId = Guid.Parse("dd10cf52-e377-4aab-a994-b5d2aca8b06f"),
                Name = "Noah Green",
                Location = "Denver",
                Description = "Telecommunications Industry Recruiter",
                ProfilePictureUrl = ProfilePictureUrl,
                IsVerified = true,
            },
            new Recruiter
            {
                Id = Guid.Parse("60686b22-f599-45f6-bc4c-f0beda6ab720"),
                UserId = Guid.Parse("175f4cbc-2101-4c19-b331-2cfb0daea1f7"),
                Name = "Elano AAA",
                Location = "Cochabamba",
                Description = "AWS Recruiter",
                ProfilePictureUrl = ProfilePictureUrl,
                IsVerified = true,
            },
        ];
    }
}
