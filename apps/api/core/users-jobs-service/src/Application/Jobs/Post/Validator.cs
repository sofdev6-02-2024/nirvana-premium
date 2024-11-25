namespace Application.Jobs.Post;

using Domain.Enums;
using FluentValidation;

internal sealed class Validator : AbstractValidator<PostCommand>
{
    public Validator()
    {
        _ = RuleFor(static c => c.Title)
            .NotEmpty()
            .WithMessage("The Title should not be empty.")
            .NotNull()
            .WithMessage("The Title is required.")
            .MaximumLength(100)
            .WithMessage("The Title should not exceed 100 characters.");

        _ = RuleFor(static c => c.SalaryPerHour)
            .NotEmpty()
            .WithMessage("The Salary should not be empty")
            .NotNull()
            .WithMessage("The Salary is required")
            .GreaterThan(0)
            .WithMessage("The Salary should be greater than 0");

        _ = RuleFor(static c => c.Schedule)
            .NotEmpty()
            .WithMessage("The Schedule should not be empty")
            .NotNull()
            .WithMessage("The Schedule is required")
            .IsEnumName(typeof(Schedule))
            .WithMessage("The Schedule should be FullTime or PartTime ");

        _ = RuleFor(static c => c.Modality)
            .NotEmpty()
            .WithMessage("The Modality should not be empty")
            .NotNull()
            .WithMessage("The Modality is required")
            .IsEnumName(typeof(JobModality))
            .WithMessage("The Modality should be Remote or OnSite");

        _ = RuleFor(static c => c.Location)
            .MaximumLength(150)
            .WithMessage("The Location should not exceed 150 characters.");

        _ = RuleFor(static c => c.Description)
            .NotEmpty()
            .WithMessage("The Description should not be empty")
            .NotNull()
            .WithMessage("The Description is required")
            .MinimumLength(50)
            .WithMessage("The Description should have at least 50 characters.");

        _ = RuleFor(static c => c.Skills)
            .NotEmpty()
            .WithMessage("The Skills should not be empty")
            .NotNull()
            .WithMessage("The Skills are required")
            .Must(static skills => skills.Count > 0)
            .WithMessage("The Skills should have at least one skill.");

        _ = RuleFor(static c => c.Languages)
            .NotEmpty()
            .WithMessage("The SpokenLanguages should not be empty")
            .NotNull()
            .WithMessage("The SpokenLanguages are required")
            .Must(static languages => languages.Count > 0)
            .WithMessage("The SpokenLanguages should have at least one language.");

        _ = RuleFor(static c => c.RecruiterId)
            .NotEmpty()
            .WithMessage("The Recruiter Id should not be empty")
            .NotNull()
            .WithMessage("The Recruiter Id is required");

        _ = RuleFor(static c => c.SpecializationId)
            .NotEmpty()
            .WithMessage("The Specialization Id should not be empty")
            .NotNull()
            .WithMessage("The Specialization Id is required");
    }
}
