namespace Application.Users.GetByIdentityId;

using Domain.Entities.Users;
using SkApplication.Contracts;
using SkDomain.Extensions;

internal sealed class Converter : IConverter<User, Response>
{
    public Response Convert(User from)
    {
        return new Response
        {
            Id = from.Id,
            Role = from.Role.GetDescription(),
            Email = from.Email,
            DoOnboarding = from.DoOnboarding,
            DeveloperId = from.Developer?.Id,
            RecruiterId = from.Recruiter?.Id,
        };
    }
}
