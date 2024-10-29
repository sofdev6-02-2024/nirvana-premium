namespace Application.Jobs.GetById;

using SkApplication.Contracts;

public sealed record GetByIdQuery(Guid JobId) : IQuery<Response>;
