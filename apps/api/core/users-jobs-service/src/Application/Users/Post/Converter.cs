namespace Application.Users.Post;

using Domain.Entities.Users;
using Domain.Enums;
using SkApplication.Contracts;

internal sealed class Converter : IConverter<PostCommand, User>
{
    public User Convert(PostCommand from)
    {
        return new User
        {
            IdentityId = from.IdentityId,
            Email = from.Email,
            Role = Enum.Parse<UserRole>(from.Role, true),
        };
    }
}
