namespace Application.Recruiters.GetAll;

using Domain.Entities.Recruiters;
using SkApplication.Contracts;

internal sealed class Converter : IConverter<Recruiter, Response>
{
    public Response Convert(Recruiter recruiter)
    {
        return new Response
        {
            Id = recruiter.Id,

            Name = recruiter.Name,

            Location = recruiter.Location,
            Description = recruiter.Description,
            ProfilePictureUrl = recruiter.ProfilePictureUrl,
            IsVerified = recruiter.IsVerified ?? false,

            UserId = recruiter.UserId,

            CreatedAt = recruiter.CreatedAt,
            UpdatedAt = recruiter.UpdatedAt,
        };
    }
}
