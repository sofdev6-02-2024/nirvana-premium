namespace Application.Jobs.GetByDeveloper;

using Domain.Jobs;
using SkApplication.Contracts;

internal sealed class Converter : IConverter<Job, Response>
{
    public Response Convert(Job job)
    {
        return new Response { Id = job.Id };
    }
}
