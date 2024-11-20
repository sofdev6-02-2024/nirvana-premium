namespace Application.Languages.GetAll;

using SkApplication.Contracts;

public sealed record GetAllQuery : IQuery<IList<Response>>;
