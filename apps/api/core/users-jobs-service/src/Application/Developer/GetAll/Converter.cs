namespace Application.Developer.GetAll;

using Domain.Attributes.Languages;
using Domain.Attributes.Skills;
using Domain.Attributes.Specializations;
using Domain.Entities.Developers;
using SkApplication.Contracts;

internal sealed class SkillConverter : IConverter<Skill, SkillResponse>
{
    public SkillResponse Convert(Skill from)
    {
        return new SkillResponse { Id = from.Id, Name = from.Name };
    }
}

internal sealed class LanguageConverter : IConverter<Language, LanguageResponse>
{
    public LanguageResponse Convert(Language from)
    {
        return new LanguageResponse { Id = from.Id, Name = from.Name };
    }
}

internal sealed class SpecializationConverter : IConverter<Specialization, SpecializationResponse>
{
    public SpecializationResponse Convert(Specialization from)
    {
        return new SpecializationResponse { Id = from.Id, Name = from.Name };
    }
}

internal sealed class Converter : IConverter<Developer, Response>
{
    public Response Convert(Developer from)
    {
        SpecializationConverter specializationConverter = new();
        SkillConverter skillConverter = new();
        LanguageConverter languageConverter = new();

        return new Response
        {
            Id = from.Id,
            Name = from.Name,
            LastName = from.LastName,
            YearsOfExperience = from.YearsOfExperience,
            SalaryPerHourExpected = from.SalaryPerHourExpected,
            Location = from.Location,
            PortfolioUrl = from.PortfolioUrl,
            ProfilePictureUrl = from.ProfilePictureUrl,
            Description = from.Description,
            Specialization = specializationConverter.Convert(from.Specialization),
            Skills = from.Skills.Select(skill => skillConverter.Convert(skill)).ToList(),
            SpokenLanguages = from
                .Languages.Select(language => languageConverter.Convert(language))
                .ToList(),
        };
    }
}
