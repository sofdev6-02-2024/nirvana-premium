namespace Application.Core.Jobs.GetBySlug;

using Application.Contracts;

public sealed record GetJobBySlugQuery(string Slug) : IQuery<JobResponse>;
