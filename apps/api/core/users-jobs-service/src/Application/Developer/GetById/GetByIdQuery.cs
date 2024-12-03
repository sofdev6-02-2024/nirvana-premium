namespace Application.Developer.GetById;

using SkApplication.Contracts;

public sealed record GetByIdQuery(Guid DeveloperId) : IQuery<Response>;
