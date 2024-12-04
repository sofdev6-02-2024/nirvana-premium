namespace Infrastructure.Seed.Entities.Data;

using Attributes.Ids;
using Domain.Entities.Developers;
using Domain.Enums;
using Domain.Joins.DeveloperLanguages;
using Domain.Joins.DeveloperSkills;
using Ids;
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
                Id = DevelopersId.One,
                UserId = UsersId.One,
                Name = "John",
                LastName = "Doe",
                Description = "Experienced Software Engineer",
                YearsOfExperience = 5,
                SalaryPerHourExpected = 75,
                ModalityPreferred = DeveloperModality.Remote,
                Location = "New York",
                PortfolioUrl = PortfolioUrl,
                ProfilePictureUrl = ProfilePictureUrl,
                SpecializationId = SpecializationsId.SoftwareEngineer,
                DeveloperLanguages =
                [
                    new DeveloperLanguage { LanguageId = LanguagesId.English },
                    new DeveloperLanguage { LanguageId = LanguagesId.Spanish },
                    new DeveloperLanguage { LanguageId = LanguagesId.French },
                ],
                DeveloperSkills =
                [
                    new DeveloperSkill { SkillId = SkillsId.CSharp },
                    new DeveloperSkill { SkillId = SkillsId.Java },
                    new DeveloperSkill { SkillId = SkillsId.Html },
                    new DeveloperSkill { SkillId = SkillsId.JavaScript },
                    new DeveloperSkill { SkillId = SkillsId.Css },
                ],
            },
            new Developer
            {
                Id = DevelopersId.Two,
                UserId = UsersId.Two,
                Name = "Jane",
                LastName = "Smith",
                Description = "Skilled Data Scientist",
                YearsOfExperience = 3,
                SalaryPerHourExpected = 60,
                ModalityPreferred = DeveloperModality.OnSite,
                Location = "Los Angeles",
                PortfolioUrl = PortfolioUrl,
                ProfilePictureUrl = ProfilePictureUrl,
                SpecializationId = SpecializationsId.DataScience,
                DeveloperLanguages =
                [
                    new DeveloperLanguage { LanguageId = LanguagesId.English },
                    new DeveloperLanguage { LanguageId = LanguagesId.Spanish },
                    new DeveloperLanguage { LanguageId = LanguagesId.French },
                ],
                DeveloperSkills =
                [
                    new DeveloperSkill { SkillId = SkillsId.CSharp },
                    new DeveloperSkill { SkillId = SkillsId.Java },
                    new DeveloperSkill { SkillId = SkillsId.Html },
                    new DeveloperSkill { SkillId = SkillsId.JavaScript },
                    new DeveloperSkill { SkillId = SkillsId.Css },
                ],
            },
            new Developer
            {
                Id = DevelopersId.Three,
                UserId = UsersId.Three,
                Name = "Alex",
                LastName = "Taylor",
                Description = "Creative Marketing Specialist",
                YearsOfExperience = 4,
                SalaryPerHourExpected = 65,
                ModalityPreferred = DeveloperModality.Remote,
                Location = "Chicago",
                PortfolioUrl = PortfolioUrl,
                ProfilePictureUrl = ProfilePictureUrl,
                SpecializationId = SpecializationsId.Marketing,
                DeveloperLanguages =
                [
                    new DeveloperLanguage { LanguageId = LanguagesId.English },
                    new DeveloperLanguage { LanguageId = LanguagesId.Spanish },
                    new DeveloperLanguage { LanguageId = LanguagesId.French },
                ],
                DeveloperSkills =
                [
                    new DeveloperSkill { SkillId = SkillsId.CSharp },
                    new DeveloperSkill { SkillId = SkillsId.Java },
                    new DeveloperSkill { SkillId = SkillsId.Html },
                    new DeveloperSkill { SkillId = SkillsId.JavaScript },
                    new DeveloperSkill { SkillId = SkillsId.Css },
                ],
            },
            new Developer
            {
                Id = DevelopersId.Four,
                UserId = UsersId.Four,
                Name = "Emily",
                LastName = "Clark",
                Description = "UI/UX Designer",
                YearsOfExperience = 6,
                SalaryPerHourExpected = 70,
                ModalityPreferred = DeveloperModality.OnSite,
                Location = "Austin",
                PortfolioUrl = PortfolioUrl,
                ProfilePictureUrl = ProfilePictureUrl,
                SpecializationId = SpecializationsId.Design,
                DeveloperLanguages =
                [
                    new DeveloperLanguage { LanguageId = LanguagesId.English },
                    new DeveloperLanguage { LanguageId = LanguagesId.Spanish },
                    new DeveloperLanguage { LanguageId = LanguagesId.French },
                ],
                DeveloperSkills =
                [
                    new DeveloperSkill { SkillId = SkillsId.CSharp },
                    new DeveloperSkill { SkillId = SkillsId.Java },
                    new DeveloperSkill { SkillId = SkillsId.Html },
                    new DeveloperSkill { SkillId = SkillsId.JavaScript },
                    new DeveloperSkill { SkillId = SkillsId.Css },
                ],
            },
            new Developer
            {
                Id = DevelopersId.Five,
                UserId = UsersId.Five,
                Name = "Michael",
                LastName = "Brown",
                Description = "Project Manager",
                YearsOfExperience = 7,
                SalaryPerHourExpected = 80,
                ModalityPreferred = DeveloperModality.Remote,
                Location = "Seattle",
                PortfolioUrl = PortfolioUrl,
                ProfilePictureUrl = ProfilePictureUrl,
                SpecializationId = SpecializationsId.ProjectManagement,
                DeveloperLanguages =
                [
                    new DeveloperLanguage { LanguageId = LanguagesId.English },
                    new DeveloperLanguage { LanguageId = LanguagesId.Spanish },
                    new DeveloperLanguage { LanguageId = LanguagesId.French },
                ],
                DeveloperSkills =
                [
                    new DeveloperSkill { SkillId = SkillsId.CSharp },
                    new DeveloperSkill { SkillId = SkillsId.Java },
                    new DeveloperSkill { SkillId = SkillsId.Html },
                    new DeveloperSkill { SkillId = SkillsId.JavaScript },
                    new DeveloperSkill { SkillId = SkillsId.Css },
                ],
            },
            new Developer
            {
                Id = DevelopersId.Six,
                UserId = UsersId.Six,
                Name = "Sarah",
                LastName = "Lee",
                Description = "Cybersecurity Expert",
                YearsOfExperience = 5,
                SalaryPerHourExpected = 90,
                ModalityPreferred = DeveloperModality.OnSite,
                Location = "Denver",
                PortfolioUrl = PortfolioUrl,
                ProfilePictureUrl = ProfilePictureUrl,
                SpecializationId = SpecializationsId.Cybersecurity,
                DeveloperLanguages =
                [
                    new DeveloperLanguage { LanguageId = LanguagesId.English },
                    new DeveloperLanguage { LanguageId = LanguagesId.Spanish },
                    new DeveloperLanguage { LanguageId = LanguagesId.French },
                ],
                DeveloperSkills =
                [
                    new DeveloperSkill { SkillId = SkillsId.CSharp },
                    new DeveloperSkill { SkillId = SkillsId.Java },
                    new DeveloperSkill { SkillId = SkillsId.Html },
                    new DeveloperSkill { SkillId = SkillsId.JavaScript },
                    new DeveloperSkill { SkillId = SkillsId.Css },
                ],
            },
            new Developer
            {
                Id = DevelopersId.Seven,
                UserId = UsersId.Seven,
                Name = "Chris",
                LastName = "Wilson",
                Description = "Cloud Computing Enthusiast",
                YearsOfExperience = 2,
                SalaryPerHourExpected = 55,
                ModalityPreferred = DeveloperModality.Remote,
                Location = "Remote",
                PortfolioUrl = PortfolioUrl,
                ProfilePictureUrl = ProfilePictureUrl,
                SpecializationId = SpecializationsId.CloudComputing,
                DeveloperLanguages =
                [
                    new DeveloperLanguage { LanguageId = LanguagesId.English },
                    new DeveloperLanguage { LanguageId = LanguagesId.Spanish },
                    new DeveloperLanguage { LanguageId = LanguagesId.French },
                ],
                DeveloperSkills =
                [
                    new DeveloperSkill { SkillId = SkillsId.CSharp },
                    new DeveloperSkill { SkillId = SkillsId.Java },
                    new DeveloperSkill { SkillId = SkillsId.Html },
                    new DeveloperSkill { SkillId = SkillsId.JavaScript },
                    new DeveloperSkill { SkillId = SkillsId.Css },
                ],
            },
            new Developer
            {
                Id = DevelopersId.Eight,
                UserId = UsersId.Eight,
                Name = "Olivia",
                LastName = "Martinez",
                Description = "DevOps Specialist",
                YearsOfExperience = 3,
                SalaryPerHourExpected = 60,
                ModalityPreferred = DeveloperModality.OnSite,
                Location = "San Diego",
                PortfolioUrl = PortfolioUrl,
                ProfilePictureUrl = ProfilePictureUrl,
                SpecializationId = SpecializationsId.DevOps,
                DeveloperLanguages =
                [
                    new DeveloperLanguage { LanguageId = LanguagesId.English },
                    new DeveloperLanguage { LanguageId = LanguagesId.Spanish },
                    new DeveloperLanguage { LanguageId = LanguagesId.French },
                ],
                DeveloperSkills =
                [
                    new DeveloperSkill { SkillId = SkillsId.CSharp },
                    new DeveloperSkill { SkillId = SkillsId.Java },
                    new DeveloperSkill { SkillId = SkillsId.Html },
                    new DeveloperSkill { SkillId = SkillsId.JavaScript },
                    new DeveloperSkill { SkillId = SkillsId.Css },
                ],
            },
            new Developer
            {
                Id = DevelopersId.Nine,
                UserId = UsersId.Nine,
                Name = "David",
                LastName = "Garcia",
                Description = "Business Analyst",
                YearsOfExperience = 8,
                SalaryPerHourExpected = 85,
                ModalityPreferred = DeveloperModality.Remote,
                Location = "Phoenix",
                PortfolioUrl = PortfolioUrl,
                ProfilePictureUrl = ProfilePictureUrl,
                SpecializationId = SpecializationsId.BusinessAnalysis,
                DeveloperLanguages =
                [
                    new DeveloperLanguage { LanguageId = LanguagesId.English },
                    new DeveloperLanguage { LanguageId = LanguagesId.Spanish },
                    new DeveloperLanguage { LanguageId = LanguagesId.French },
                ],
                DeveloperSkills =
                [
                    new DeveloperSkill { SkillId = SkillsId.CSharp },
                    new DeveloperSkill { SkillId = SkillsId.Java },
                    new DeveloperSkill { SkillId = SkillsId.Html },
                    new DeveloperSkill { SkillId = SkillsId.JavaScript },
                    new DeveloperSkill { SkillId = SkillsId.Css },
                ],
            },
            new Developer
            {
                Id = DevelopersId.Ten,
                UserId = UsersId.Ten,
                Name = "Laura",
                LastName = "Davis",
                Description = "Content Creator",
                YearsOfExperience = 1,
                SalaryPerHourExpected = 50,
                ModalityPreferred = DeveloperModality.OnSite,
                Location = "Houston",
                PortfolioUrl = PortfolioUrl,
                ProfilePictureUrl = ProfilePictureUrl,
                SpecializationId = SpecializationsId.ContentCreation,
                DeveloperLanguages =
                [
                    new DeveloperLanguage { LanguageId = LanguagesId.English },
                    new DeveloperLanguage { LanguageId = LanguagesId.Spanish },
                    new DeveloperLanguage { LanguageId = LanguagesId.French },
                ],
                DeveloperSkills =
                [
                    new DeveloperSkill { SkillId = SkillsId.CSharp },
                    new DeveloperSkill { SkillId = SkillsId.Java },
                    new DeveloperSkill { SkillId = SkillsId.Html },
                    new DeveloperSkill { SkillId = SkillsId.JavaScript },
                    new DeveloperSkill { SkillId = SkillsId.Css },
                ],
            },
            new Developer
            {
                Id = DevelopersId.Eleven,
                UserId = UsersId.Eleven,
                Name = "Daniel",
                LastName = "Moore",
                Description = "Quality Assurance Engineer",
                YearsOfExperience = 4,
                SalaryPerHourExpected = 68,
                ModalityPreferred = DeveloperModality.Remote,
                Location = "Boston",
                PortfolioUrl = PortfolioUrl,
                ProfilePictureUrl = ProfilePictureUrl,
                SpecializationId = SpecializationsId.SoftwareEngineer,
                DeveloperLanguages =
                [
                    new DeveloperLanguage { LanguageId = LanguagesId.English },
                    new DeveloperLanguage { LanguageId = LanguagesId.Spanish },
                    new DeveloperLanguage { LanguageId = LanguagesId.French },
                ],
                DeveloperSkills =
                [
                    new DeveloperSkill { SkillId = SkillsId.CSharp },
                    new DeveloperSkill { SkillId = SkillsId.Java },
                    new DeveloperSkill { SkillId = SkillsId.Html },
                    new DeveloperSkill { SkillId = SkillsId.JavaScript },
                    new DeveloperSkill { SkillId = SkillsId.Css },
                ],
            },
            new Developer
            {
                Id = DevelopersId.Twelve,
                UserId = UsersId.Twelve,
                Name = "Sophia",
                LastName = "Lopez",
                Description = "UX Researcher",
                YearsOfExperience = 6,
                SalaryPerHourExpected = 73,
                ModalityPreferred = DeveloperModality.OnSite,
                Location = "Philadelphia",
                PortfolioUrl = PortfolioUrl,
                ProfilePictureUrl = ProfilePictureUrl,
                SpecializationId = SpecializationsId.Design,
                DeveloperLanguages =
                [
                    new DeveloperLanguage { LanguageId = LanguagesId.English },
                    new DeveloperLanguage { LanguageId = LanguagesId.Spanish },
                    new DeveloperLanguage { LanguageId = LanguagesId.French },
                ],
                DeveloperSkills =
                [
                    new DeveloperSkill { SkillId = SkillsId.CSharp },
                    new DeveloperSkill { SkillId = SkillsId.Java },
                    new DeveloperSkill { SkillId = SkillsId.Html },
                    new DeveloperSkill { SkillId = SkillsId.JavaScript },
                    new DeveloperSkill { SkillId = SkillsId.Css },
                ],
            },
            new Developer
            {
                Id = DevelopersId.Thirteen,
                UserId = UsersId.Thirteen,
                Name = "James",
                LastName = "Miller",
                Description = "Junior Developer",
                YearsOfExperience = 2,
                SalaryPerHourExpected = 65,
                ModalityPreferred = DeveloperModality.Remote,
                Location = "San Antonio",
                PortfolioUrl = PortfolioUrl,
                ProfilePictureUrl = ProfilePictureUrl,
                SpecializationId = SpecializationsId.SoftwareEngineer,
                DeveloperLanguages =
                [
                    new DeveloperLanguage { LanguageId = LanguagesId.English },
                    new DeveloperLanguage { LanguageId = LanguagesId.Spanish },
                    new DeveloperLanguage { LanguageId = LanguagesId.French },
                ],
                DeveloperSkills =
                [
                    new DeveloperSkill { SkillId = SkillsId.CSharp },
                    new DeveloperSkill { SkillId = SkillsId.Java },
                    new DeveloperSkill { SkillId = SkillsId.Html },
                    new DeveloperSkill { SkillId = SkillsId.JavaScript },
                    new DeveloperSkill { SkillId = SkillsId.Css },
                ],
            },
            new Developer
            {
                Id = DevelopersId.Fourteen,
                UserId = UsersId.Fourteen,
                Name = "Emma",
                LastName = "Anderson",
                Description = "Data Engineer",
                YearsOfExperience = 9,
                SalaryPerHourExpected = 95,
                ModalityPreferred = DeveloperModality.OnSite,
                Location = "Dallas",
                PortfolioUrl = PortfolioUrl,
                ProfilePictureUrl = ProfilePictureUrl,
                SpecializationId = SpecializationsId.DataScience,
                DeveloperLanguages =
                [
                    new DeveloperLanguage { LanguageId = LanguagesId.English },
                    new DeveloperLanguage { LanguageId = LanguagesId.Spanish },
                    new DeveloperLanguage { LanguageId = LanguagesId.French },
                ],
                DeveloperSkills =
                [
                    new DeveloperSkill { SkillId = SkillsId.CSharp },
                    new DeveloperSkill { SkillId = SkillsId.Java },
                    new DeveloperSkill { SkillId = SkillsId.Html },
                    new DeveloperSkill { SkillId = SkillsId.JavaScript },
                    new DeveloperSkill { SkillId = SkillsId.Css },
                ],
            },
            new Developer
            {
                Id = DevelopersId.Fifteen,
                UserId = UsersId.Fifteen,
                Name = "Liam",
                LastName = "Thomas",
                Description = "Senior DevOps Engineer",
                YearsOfExperience = 7,
                SalaryPerHourExpected = 78,
                ModalityPreferred = DeveloperModality.Remote,
                Location = "Miami",
                PortfolioUrl = PortfolioUrl,
                ProfilePictureUrl = ProfilePictureUrl,
                SpecializationId = SpecializationsId.DevOps,
                DeveloperLanguages =
                [
                    new DeveloperLanguage { LanguageId = LanguagesId.English },
                    new DeveloperLanguage { LanguageId = LanguagesId.Spanish },
                    new DeveloperLanguage { LanguageId = LanguagesId.French },
                ],
                DeveloperSkills =
                [
                    new DeveloperSkill { SkillId = SkillsId.CSharp },
                    new DeveloperSkill { SkillId = SkillsId.Java },
                    new DeveloperSkill { SkillId = SkillsId.Html },
                    new DeveloperSkill { SkillId = SkillsId.JavaScript },
                    new DeveloperSkill { SkillId = SkillsId.Css },
                ],
            },
        ];
    }
}
