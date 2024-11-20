namespace Application.Specializations;

using Domain.Attributes.Specializations;
using SkApplication.Contracts;

internal sealed class Converter : IConverter<List<Specialization>, Response>
{
    public Response Convert(List<Specialization> specialization)
    {
        return new Response
        {
            Specializations = specialization.Select(s => new Item
            {
                Id = s.Id,
                Name = s.Name,
            }).ToList()
        };
    }
}
