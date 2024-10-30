namespace Application.Jobs.Create;

using SkApplication.Contracts;

public sealed record CreateCommand(
    string Title,
    string Description,
    double SalaryPerHour,
    DateTime DueDate,
    string Modality,
    string Schedule,
    Guid RecruiterId,
    string? Location
) : ICommand<Response>;
