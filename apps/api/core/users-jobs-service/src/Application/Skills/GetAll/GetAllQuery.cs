namespace Application.Skills.GetAll;

using SkApplication.Contracts;

public sealed record GetAllQuery : IQuery<IList<Response>>;
