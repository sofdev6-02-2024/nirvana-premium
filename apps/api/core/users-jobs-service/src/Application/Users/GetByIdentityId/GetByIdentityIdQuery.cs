namespace Application.Users.GetByIdentityId;

using SkApplication.Contracts;

public sealed record GetByIdentityIdQuery(string IdentityId) : IQuery<Response> { }
