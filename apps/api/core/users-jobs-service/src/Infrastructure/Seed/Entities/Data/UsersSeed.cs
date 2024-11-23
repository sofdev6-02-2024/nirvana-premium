namespace Infrastructure.Seed.Entities.Data;

using Domain.Entities.Users;
using Domain.Enums;
using Ids;
using SkInfrastructure.Seed;

internal sealed class UsersSeed : BaseSeedEntity<User>
{
    protected override IEnumerable<User> GetData()
    {
        return
        [
            new User
            {
                Id = UsersId.One,
                Email = "dev1@example.com",
                IdentityId = "user_2pFw6yUg4yDsbDni74l5gjU7XjV",
                Role = UserRole.Developer,
                DoOnboarding = true,
            },
            new User
            {
                Id = UsersId.Two,
                Email = "dev2@example.com",
                IdentityId = "user_2pFwEjcnsTa7P3OkaQsPNWAYnru",
                Role = UserRole.Developer,
                DoOnboarding = true,
            },
            new User
            {
                Id = UsersId.Three,
                Email = "dev3@example.com",
                IdentityId = "user_2pFwG9ynQJbE0e77F7qqN85TjoE",
                Role = UserRole.Developer,
                DoOnboarding = true,
            },
            new User
            {
                Id = UsersId.Four,
                Email = "dev4@example.com",
                IdentityId = "user_2pFwH7R74g9gt4XCqJHiO6Xljvg",
                Role = UserRole.Developer,
                DoOnboarding = true,
            },
            new User
            {
                Id = UsersId.Five,
                Email = "dev5@example.com",
                IdentityId = "user_2pFwIQTmgGk0vGjO8AXovPHB6Mf",
                Role = UserRole.Developer,
                DoOnboarding = true,
            },
            new User
            {
                Id = UsersId.Six,
                Email = "dev6@example.com",
                IdentityId = "user_2pFwKCcYEoyks6ffvq5qOfGcESy",
                Role = UserRole.Developer,
                DoOnboarding = true,
            },
            new User
            {
                Id = UsersId.Seven,
                Email = "dev7@example.com",
                IdentityId = "user_2pFwLIfMLgJrmdio0TnhEup4aEc",
                Role = UserRole.Developer,
                DoOnboarding = true,
            },
            new User
            {
                Id = UsersId.Eight,
                Email = "dev8@example.com",
                IdentityId = "user_2pFwOJ9aIIHDTW54Y5bMxCWLWCd",
                Role = UserRole.Developer,
                DoOnboarding = true,
            },
            new User
            {
                Id = UsersId.Nine,
                Email = "dev9@example.com",
                IdentityId = "user_2pFwPwcGGdlVmruD04FLg2DLegB",
                Role = UserRole.Developer,
                DoOnboarding = true,
            },
            new User
            {
                Id = UsersId.Ten,
                Email = "dev10@example.com",
                IdentityId = "user_2pFwR8Za1cAFUl4cLsXcMIiqsnJ",
                Role = UserRole.Developer,
                DoOnboarding = true,
            },
            new User
            {
                Id = UsersId.Eleven,
                Email = "dev11@example.com",
                IdentityId = "user_2pFwS8fjdLXkAkp8t8sUbFxGVKs",
                Role = UserRole.Developer,
                DoOnboarding = true,
            },
            new User
            {
                Id = UsersId.Twelve,
                Email = "dev12@example.com",
                IdentityId = "user_2pFwTfngw6LeJwG3DmH55zOAYN5",
                Role = UserRole.Developer,
                DoOnboarding = true,
            },
            new User
            {
                Id = UsersId.Thirteen,
                Email = "dev13@example.com",
                IdentityId = "user_2pFwVldHV5wOayYQ2OJfOiSr2lH",
                Role = UserRole.Developer,
                DoOnboarding = true,
            },
            new User
            {
                Id = UsersId.Fourteen,
                Email = "dev14@example.com",
                IdentityId = "user_2pFwXL4xciC3wCsOTkJcpxQuKuh",
                Role = UserRole.Developer,
                DoOnboarding = true,
            },
            new User
            {
                Id = UsersId.Fifteen,
                Email = "dev15@example.com",
                IdentityId = "user_2pFwYlPg3VeSxZyl47JUZ92s1M9",
                Role = UserRole.Developer,
                DoOnboarding = true,
            },
            new User
            {
                Id = UsersId.Sixteen,
                Email = "rec1@example.com",
                IdentityId = "user_2pFwccn8Rsp6eVdXMvoCT1lAR6j",
                Role = UserRole.Recruiter,
                DoOnboarding = true,
            },
            new User
            {
                Id = UsersId.Seventeen,
                Email = "rec2@example.com",
                IdentityId = "user_2pFwfqNd4sxB1xPMenYQrNWuDgv",
                Role = UserRole.Recruiter,
                DoOnboarding = true,
            },
            new User
            {
                Id = UsersId.Eighteen,
                Email = "rec3@example.com",
                IdentityId = "user_2pFwgzBTFpfvbnhIMHBf2uy4svc",
                Role = UserRole.Recruiter,
                DoOnboarding = true,
            },
            new User
            {
                Id = UsersId.Nineteen,
                Email = "rec4@example.com",
                IdentityId = "user_2pFwibTEn6teMmR1kOplBBJoHnd",
                Role = UserRole.Recruiter,
                DoOnboarding = true,
            },
            new User
            {
                Id = UsersId.Twenty,
                Email = "rec5@example.com",
                IdentityId = "user_2pFwjchfq1eSjYGfqzysH3OodxE",
                Role = UserRole.Recruiter,
                DoOnboarding = true,
            },
            new User
            {
                Id = UsersId.TwentyOne,
                Email = "rec6@example.com",
                IdentityId = "user_2pFwkjkKyh1tzm7KgvchouerUYG",
                Role = UserRole.Recruiter,
                DoOnboarding = true,
            },
            new User
            {
                Id = UsersId.TwentyTwo,
                Email = "rec7@example.com",
                IdentityId = "user_2pFwllSgUOb99emZMyEmBjsltx5",
                Role = UserRole.Recruiter,
                DoOnboarding = true,
            },
            new User
            {
                Id = UsersId.TwentyThree,
                Email = "rec8@example.com",
                IdentityId = "user_2pFwmiC95TOWzjPi1uwGTamf9ef",
                Role = UserRole.Recruiter,
                DoOnboarding = true,
            },
            new User
            {
                Id = UsersId.TwentyFour,
                Email = "rec9@example.com",
                IdentityId = "user_2pFwnsVV0EwKTiJAOzLxZQKge8o",
                Role = UserRole.Recruiter,
                DoOnboarding = true,
            },
            new User
            {
                Id = UsersId.TwentyFive,
                Email = "rec10@example.com",
                IdentityId = "user_2pFwp7zEnoFWA2GEtRlNP6KcXX6",
                Role = UserRole.Recruiter,
                DoOnboarding = true,
            },
            new User
            {
                Id = UsersId.TwentySix,
                Email = "rec11@example.com",
                IdentityId = "user_2pFwqeCIht2pJDB0jw8ib5syj89",
                Role = UserRole.Recruiter,
                DoOnboarding = true,
            },
            new User
            {
                Id = UsersId.TwentySeven,
                Email = "rec12@example.com",
                IdentityId = "user_2pFwrS6A4QWZne6cZGXjnbCWoni",
                Role = UserRole.Recruiter,
                DoOnboarding = true,
            },
            new User
            {
                Id = UsersId.TwentyEight,
                Email = "rec13@example.com",
                IdentityId = "user_2pFwskLZ5k4U5xLfkXbf9g0SvGZ",
                Role = UserRole.Recruiter,
                DoOnboarding = true,
            },
            new User
            {
                Id = UsersId.TwentyNine,
                Email = "rec14@example.com",
                IdentityId = "user_2pFwtlCuQeHED2WY78JSi6IGqzl",
                Role = UserRole.Recruiter,
                DoOnboarding = true,
            },
            new User
            {
                Id = UsersId.Thirty,
                Email = "rec15@example.com",
                IdentityId = "user_2pFwuwOECUZzpPJI5XvAgazlhSD",
                Role = UserRole.Recruiter,
                DoOnboarding = true,
            },
        ];
    }
}
