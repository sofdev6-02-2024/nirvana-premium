namespace Application.Users.GetById;

using SkApplication.Contracts;

public sealed record GetUserByIdQuery(Guid UserId) : IQuery<Response>;
