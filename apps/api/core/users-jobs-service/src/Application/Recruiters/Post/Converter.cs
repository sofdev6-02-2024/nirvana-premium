namespace Application.Recruiters.Post;

using Domain.Entities.Recruiters;
using SkApplication.Contracts;

internal sealed class Converter : IConverter<PostCommand, Recruiter>
{
    public Recruiter Convert(PostCommand from)
    {
        return new Recruiter
        {
            UserId = from.UserId,
            Name = from.Name,
            Location = from.Location,
            ProfilePictureUrl = from.ProfilePicture,
        };
    }
}
