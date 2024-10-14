namespace Application.Core.Users.GetById;

using Application.Contracts;

public sealed record GetUserByIdQuery(Guid UserId) : IQuery<UserResponse>;
