namespace Infrastructure.Seed.Entities.Data;

using Domain.Entities.Recruiters;
using Ids;
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
                Id = RecruitersId.One,
                UserId = UsersId.Sixteen,
                Name = "Alice Johnson",
                Location = "San Francisco",
                Description = "Tech Recruiter specializing in IT roles",
                ProfilePictureUrl = ProfilePictureUrl,
                IsVerified = true,
            },
            new Recruiter
            {
                Id = RecruitersId.Two,
                UserId = UsersId.Seventeen,
                Name = "Bob Lee",
                Location = "New York",
                Description = "Healthcare Recruiter",
                ProfilePictureUrl = ProfilePictureUrl,
                IsVerified = true,
            },
            new Recruiter
            {
                Id = RecruitersId.Three,
                UserId = UsersId.Eighteen,
                Name = "Cathy Wright",
                Location = "Miami",
                Description = "Finance Industry Recruiter",
                ProfilePictureUrl = ProfilePictureUrl,
                IsVerified = true,
            },
            new Recruiter
            {
                Id = RecruitersId.Four,
                UserId = UsersId.Nineteen,
                Name = "David Scott",
                Location = "Houston",
                Description = "Education and Research Recruiter",
                ProfilePictureUrl = ProfilePictureUrl,
                IsVerified = true,
            },
            new Recruiter
            {
                Id = RecruitersId.Five,
                UserId = UsersId.Twenty,
                Name = "Ella Ray",
                Location = "Chicago",
                Description = "Engineering Recruiter",
                ProfilePictureUrl = ProfilePictureUrl,
                IsVerified = true,
            },
            new Recruiter
            {
                Id = RecruitersId.Six,
                UserId = UsersId.TwentyOne,
                Name = "Frank Brown",
                Location = "Dallas",
                Description = "Experienced Recruiter in Oil & Gas Industry",
                ProfilePictureUrl = ProfilePictureUrl,
                IsVerified = true,
            },
            new Recruiter
            {
                Id = RecruitersId.Seven,
                UserId = UsersId.TwentyTwo,
                Name = "Grace Kim",
                Location = "San Diego",
                Description = "Digital Marketing Recruiter",
                ProfilePictureUrl = ProfilePictureUrl,
                IsVerified = true,
            },
            new Recruiter
            {
                Id = RecruitersId.Eight,
                UserId = UsersId.TwentyThree,
                Name = "Henry Patel",
                Location = "Phoenix",
                Description = "Legal Industry Recruiter",
                ProfilePictureUrl = ProfilePictureUrl,
                IsVerified = true,
            },
            new Recruiter
            {
                Id = RecruitersId.Nine,
                UserId = UsersId.TwentyFour,
                Name = "Isabel Martinez",
                Location = "Philadelphia",
                Description = "Government Sector Recruiter",
                ProfilePictureUrl = ProfilePictureUrl,
                IsVerified = true,
            },
            new Recruiter
            {
                Id = RecruitersId.Ten,
                UserId = UsersId.TwentyFive,
                Name = "Jack Young",
                Location = "Austin",
                Description = "IT and Cybersecurity Recruiter",
                ProfilePictureUrl = ProfilePictureUrl,
                IsVerified = true,
            },
            new Recruiter
            {
                Id = RecruitersId.Eleven,
                UserId = UsersId.TwentySix,
                Name = "Karen Nguyen",
                Location = "San Jose",
                Description = "Healthcare and Biotech Recruiter",
                ProfilePictureUrl = ProfilePictureUrl,
                IsVerified = true,
            },
            new Recruiter
            {
                Id = RecruitersId.Twelve,
                UserId = UsersId.TwentySeven,
                Name = "Louis Bell",
                Location = "Las Vegas",
                Description = "Manufacturing Industry Recruiter",
                ProfilePictureUrl = ProfilePictureUrl,
                IsVerified = true,
            },
            new Recruiter
            {
                Id = RecruitersId.Thirteen,
                UserId = UsersId.TwentyEight,
                Name = "Mia Lopez",
                Location = "Orlando",
                Description = "Freelance Creative Recruiter",
                ProfilePictureUrl = ProfilePictureUrl,
                IsVerified = true,
            },
            new Recruiter
            {
                Id = RecruitersId.Fourteen,
                UserId = UsersId.TwentyNine,
                Name = "Noah Green",
                Location = "Denver",
                Description = "Telecommunications Industry Recruiter",
                ProfilePictureUrl = ProfilePictureUrl,
                IsVerified = true,
            },
            new Recruiter
            {
                Id = RecruitersId.Fifteen,
                UserId = UsersId.Thirty,
                Name = "Elano AAA",
                Location = "Cochabamba",
                Description = "AWS Recruiter",
                ProfilePictureUrl = ProfilePictureUrl,
                IsVerified = true,
            },
        ];
    }
}
