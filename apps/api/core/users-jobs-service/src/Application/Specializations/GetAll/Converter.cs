namespace Application.Specializations.GetAll;

using Domain.Attributes.Specializations;
using SkApplication.Contracts;

internal sealed class Converter : IConverter<Specialization, Response>
{
    public Response Convert(Specialization from)
    {
        return new Response
        {
            Id = from.Id,
            Name = from.Name
        };
    }
}
