namespace Application.Developer.Post;

using Domain.Entities.Developers;
using Domain.Enums;
using Domain.Joins.DeveloperLanguages;
using Domain.Joins.DeveloperSkills;
using SkApplication.Contracts;

internal sealed class Converter : IConverter<PostCommand, Developer>
{
    public Developer Convert(PostCommand from)
    {
        return new Developer
        {
            UserId = from.UserId,
            Name = from.FirstName,
            LastName = from.LastName,
            ModalityPreferred = Enum.Parse<DeveloperModality>(from.Modality, true),
            YearsOfExperience = from.YearsOfExperience,
            SalaryPerHourExpected = from.SalaryExpected,
            Location = from.Location,
            ProfilePictureUrl = from.ProfilePicture,
            PortfolioUrl = from.PortfolioUrl,

            SpecializationId = from.SpecializationId,

            DeveloperSkills = from.Skills.Select(x => new DeveloperSkill { SkillId = x }).ToList(),
            DeveloperLanguages = from
                .SpokenLanguages.Select(x => new DeveloperLanguage { LanguageId = x })
                .ToList(),
        };
    }
}
