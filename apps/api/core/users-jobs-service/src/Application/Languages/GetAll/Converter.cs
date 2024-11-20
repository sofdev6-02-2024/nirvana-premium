namespace Application.Languages.GetAll;

using Domain.Attributes.Languages;
using SkApplication.Contracts;

internal sealed class Converter : IConverter<Language, Response>
{
    public Response Convert(Language from)
    {
        return new Response
        {
            Id = from.Id,
            Name = from.Name
        };
    }
}
