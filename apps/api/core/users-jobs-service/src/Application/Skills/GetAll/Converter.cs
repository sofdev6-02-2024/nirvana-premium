namespace Application.Skills.GetAll;

using Domain.Attributes.Skills;
using SkApplication.Contracts;

internal sealed class Converter : IConverter<Skill, Response>
{
    public Response Convert(Skill from)
    {
        return new Response
        {
            Id = from.Id,
            Name = from.Name
        };
    }
}
