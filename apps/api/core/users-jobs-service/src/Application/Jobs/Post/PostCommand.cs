namespace Application.Jobs.Post;

using SkApplication.Contracts;

public sealed class PostCommand(
    string title,
    double salaryPerHour,
    string schedule,
    string modality,
    string? location,
    string description,
    IReadOnlyList<Guid> skills,
    IReadOnlyList<Guid> languages,
    Guid recruiterId,
    Guid specializationId)
    : ICommand<Response>
{
    public string Title { get; } = title;
    public double SalaryPerHour { get; } = salaryPerHour;
    public string Schedule { get; } = schedule;
    public string Modality { get; } = modality;
    public string? Location { get; } = location;
    public string Description { get; } = description;
    public IReadOnlyList<Guid> Skills { get; } = skills;
    public IReadOnlyList<Guid> Languages { get; } = languages;
    public Guid RecruiterId { get; } = recruiterId;
    public Guid SpecializationId { get; } = specializationId;
}
