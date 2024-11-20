namespace Application.Skills.GetAll;

using SkApplication.Contracts;

internal sealed class Converter : IConverter<List<Domain.Attributes.Skills.Skill>, Response>
{
    public Response Convert(List<Domain.Attributes.Skills.Skill> skills)
    {
        return new Response
        {
            Skills = skills.Select(s => new Skill
            {
                Id = s.Id,
                Name = s.Name,
            }).ToList()
        };
    }
}
