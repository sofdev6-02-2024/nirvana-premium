namespace Application.Jobs.Create;

using SkApplication.Contracts;

public sealed record CreateJobCommand(
    string Slug,
    string Title,
    string Type,
    string LocationType,
    int Salary,
    string CompanyName,
    bool Approved,
    string? Location,
    string? Description,
    string? ApplicationEmail,
    Uri? ApplicationUrl,
    Uri? CompanyLogoUrl
) : ICommand<Response>;
