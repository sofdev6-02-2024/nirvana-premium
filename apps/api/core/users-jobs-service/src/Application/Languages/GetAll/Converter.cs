namespace Application.Languages.GetAll;

using SkApplication.Contracts;

internal sealed class Converter : IConverter<List<Domain.Attributes.Languages.Language>, Response>
{
    public Response Convert(List<Domain.Attributes.Languages.Language> languages)
    {
        return new Response
        {
            Languages = languages.Select(s => new Language
            {
                Id = s.Id,
                Name = s.Name,
            }).ToList()
        };
    }
}
