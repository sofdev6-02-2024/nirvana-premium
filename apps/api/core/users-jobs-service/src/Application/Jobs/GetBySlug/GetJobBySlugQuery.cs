namespace Application.Jobs.GetBySlug;

using SkApplication.Contracts;

public sealed record GetJobBySlugQuery(string Slug) : IQuery<Response>;
