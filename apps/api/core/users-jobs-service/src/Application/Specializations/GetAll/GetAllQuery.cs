namespace Application.Specializations.GetAll;

using SkApplication.Contracts;

public sealed record GetAllQuery : IQuery<IList<Response>>;
