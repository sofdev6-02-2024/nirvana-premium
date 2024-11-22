namespace Infrastructure.Seed.Entities;

using Domain.Entities.Users;
using Domain.Enums;
using SkInfrastructure.Seed;

internal sealed class UsersSeed : BaseSeedEntity<User>
{
    protected override IEnumerable<User> GetData()
    {
        return
        [
            new User
            {
                Id = Guid.Parse("04eba753-86b6-4575-9308-52933fd3494d"),
                Email = "dev1@example.com",
                IdentityId = "1",
                Role = UserRole.Developer,
                DoOnboarding = true,
            },
            new User
            {
                Id = Guid.Parse("d5632548-07d2-451c-ab49-08332e6d7d5d"),
                Email = "dev2@example.com",
                IdentityId = "2",
                Role = UserRole.Developer,
                DoOnboarding = true,
            },
            new User
            {
                Id = Guid.Parse("a4db4e7a-9984-4392-a51f-3d5dea04968c"),
                Email = "dev3@example.com",
                IdentityId = "3",
                Role = UserRole.Developer,
                DoOnboarding = true,
            },
            new User
            {
                Id = Guid.Parse("7366c6e1-4eba-4c78-bdce-a031f896f5a2"),
                Email = "dev4@example.com",
                IdentityId = "4",
                Role = UserRole.Developer,
                DoOnboarding = true,
            },
            new User
            {
                Id = Guid.Parse("567ae4fe-6118-4183-a094-b543b5504361"),
                Email = "dev5@example.com",
                IdentityId = "5",
                Role = UserRole.Developer,
                DoOnboarding = true,
            },
            new User
            {
                Id = Guid.Parse("ed519d80-7d95-4f42-9239-fa742777afc8"),
                Email = "dev6@example.com",
                IdentityId = "6",
                Role = UserRole.Developer,
                DoOnboarding = true,
            },
            new User
            {
                Id = Guid.Parse("3cf7872d-2e6c-4767-b612-f5325db2637e"),
                Email = "dev7@example.com",
                IdentityId = "7",
                Role = UserRole.Developer,
                DoOnboarding = true,
            },
            new User
            {
                Id = Guid.Parse("b5b277ac-9a62-4c11-8b30-759af7f8b48b"),
                Email = "dev8@example.com",
                IdentityId = "8",
                Role = UserRole.Developer,
                DoOnboarding = true,
            },
            new User
            {
                Id = Guid.Parse("0d971e63-6891-4dea-9e68-125176e56033"),
                Email = "dev9@example.com",
                IdentityId = "9",
                Role = UserRole.Developer,
                DoOnboarding = true,
            },
            new User
            {
                Id = Guid.Parse("8ee72569-f38d-4ac3-b4e9-91b2676dc17f"),
                Email = "dev10@example.com",
                IdentityId = "10",
                Role = UserRole.Developer,
                DoOnboarding = true,
            },
            new User
            {
                Id = Guid.Parse("33210350-a20d-4bb3-912d-723bf3d1c537"),
                Email = "dev11@example.com",
                IdentityId = "11",
                Role = UserRole.Developer,
                DoOnboarding = true,
            },
            new User
            {
                Id = Guid.Parse("c36f135d-7ea2-4c8e-b240-047054013e29"),
                Email = "dev12@example.com",
                IdentityId = "12",
                Role = UserRole.Developer,
                DoOnboarding = true,
            },
            new User
            {
                Id = Guid.Parse("9cb663cd-5c63-47c2-bb26-6369dc6eb1c3"),
                Email = "dev13@example.com",
                IdentityId = "13",
                Role = UserRole.Developer,
                DoOnboarding = true,
            },
            new User
            {
                Id = Guid.Parse("02156345-a6a8-4fbf-8a50-8617dd994559"),
                Email = "dev14@example.com",
                IdentityId = "14",
                Role = UserRole.Developer,
                DoOnboarding = true,
            },
            new User
            {
                Id = Guid.Parse("825a9f03-9b9f-4eb0-b312-b90ce6d88a3b"),
                Email = "dev15@example.com",
                IdentityId = "15",
                Role = UserRole.Developer,
                DoOnboarding = true,
            },
            new User
            {
                Id = Guid.Parse("b96d1b8f-c0e3-47fb-97fa-0f034ce98769"),
                Email = "rec1@example.com",
                IdentityId = "16",
                Role = UserRole.Recruiter,
                DoOnboarding = true,
            },
            new User
            {
                Id = Guid.Parse("948c059b-4524-4a0a-9915-1eeab5784959"),
                Email = "rec2@example.com",
                IdentityId = "17",
                Role = UserRole.Recruiter,
                DoOnboarding = true,
            },
            new User
            {
                Id = Guid.Parse("663a7ff2-f7f7-43c7-83b3-f53b9fbfc950"),
                Email = "rec3@example.com",
                IdentityId = "18",
                Role = UserRole.Recruiter,
                DoOnboarding = true,
            },
            new User
            {
                Id = Guid.Parse("17d635c0-46a9-4907-ab71-f84b87cc42e1"),
                Email = "rec4@example.com",
                IdentityId = "19",
                Role = UserRole.Recruiter,
                DoOnboarding = true,
            },
            new User
            {
                Id = Guid.Parse("65dbc8bc-6c59-46dd-9b04-7c0cc30cd8bc"),
                Email = "rec5@example.com",
                IdentityId = "20",
                Role = UserRole.Recruiter,
                DoOnboarding = true,
            },
            new User
            {
                Id = Guid.Parse("32b9cafe-9106-4727-b864-5c829bfca883"),
                Email = "rec6@example.com",
                IdentityId = "21",
                Role = UserRole.Recruiter,
                DoOnboarding = true,
            },
            new User
            {
                Id = Guid.Parse("b9e8e393-9f41-4af8-b3a8-6926908b8562"),
                Email = "rec7@example.com",
                IdentityId = "22",
                Role = UserRole.Recruiter,
                DoOnboarding = true,
            },
            new User
            {
                Id = Guid.Parse("0641ba75-8890-4a04-97db-50921078b6fc"),
                Email = "rec8@example.com",
                IdentityId = "23",
                Role = UserRole.Recruiter,
                DoOnboarding = true,
            },
            new User
            {
                Id = Guid.Parse("408f86b6-387c-4f25-a5b6-f9bbc141b845"),
                Email = "rec9@example.com",
                IdentityId = "24",
                Role = UserRole.Recruiter,
                DoOnboarding = true,
            },
            new User
            {
                Id = Guid.Parse("4c6b3d04-bba4-46d6-be91-7e1c4138e65e"),
                Email = "rec10@example.com",
                IdentityId = "25",
                Role = UserRole.Recruiter,
                DoOnboarding = true,
            },
            new User
            {
                Id = Guid.Parse("d862feaf-9724-4d77-b8c9-c9954509ed44"),
                Email = "rec11@example.com",
                IdentityId = "26",
                Role = UserRole.Recruiter,
                DoOnboarding = true,
            },
            new User
            {
                Id = Guid.Parse("6589cd98-a925-478d-812a-761f92d877dd"),
                Email = "rec12@example.com",
                IdentityId = "27",
                Role = UserRole.Recruiter,
                DoOnboarding = true,
            },
            new User
            {
                Id = Guid.Parse("a70f3710-28b1-4a46-9840-f770867ce90c"),
                Email = "rec13@example.com",
                IdentityId = "28",
                Role = UserRole.Recruiter,
                DoOnboarding = true,
            },
            new User
            {
                Id = Guid.Parse("dd10cf52-e377-4aab-a994-b5d2aca8b06f"),
                Email = "rec14@example.com",
                IdentityId = "29",
                Role = UserRole.Recruiter,
                DoOnboarding = true,
            },
            new User
            {
                Id = Guid.Parse("175f4cbc-2101-4c19-b331-2cfb0daea1f7"),
                Email = "rec15@example.com",
                IdentityId = "30",
                Role = UserRole.Recruiter,
                DoOnboarding = true,
            },
        ];
    }
}
