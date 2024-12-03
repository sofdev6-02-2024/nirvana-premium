namespace Application.Jobs.GetApplicantByDeveloperId;

using SkApplication.Contracts;

public sealed record GetApplicantByDeveloperIdQuery(
    Guid DeveloperId,
    Guid JobId
    ) : IQuery<Response> { }
