namespace Application.Developer.Post;

using Domain.Enums;
using FluentValidation;

internal sealed class Validator : AbstractValidator<PostCommand>
{
    public Validator()
    {
        _ = RuleFor(static c => c.UserId)
            .NotEmpty()
            .WithMessage("The User Id should not be empty")
            .NotNull()
            .WithMessage("The User Id is required");

        _ = RuleFor(static c => c.FirstName)
            .NotEmpty()
            .WithMessage("The First Name should not be empty")
            .NotNull()
            .WithMessage("The First Name is required")
            .MaximumLength(50)
            .WithMessage("The First Name should not exceed 50 characters.");

        _ = RuleFor(static c => c.LastName)
            .NotEmpty()
            .WithMessage("The Last Name should not be empty")
            .NotNull()
            .WithMessage("The Last Name is required")
            .MaximumLength(50)
            .WithMessage("The Last Name should not exceed 50 characters.");

        _ = RuleFor(static c => c.Modality)
            .NotEmpty()
            .WithMessage("The Modality should not be empty")
            .NotNull()
            .WithMessage("The Modality is required")
            .IsEnumName(typeof(DeveloperModality))
            .WithMessage("The Modality should be Remote, OnSite, or Hybrid");

        _ = RuleFor(static c => c.YearsOfExperience)
            .GreaterThanOrEqualTo(0)
            .WithMessage("The Years of Experience should be greater than or equal to 0");

        _ = RuleFor(static c => c.SalaryExpected)
            .GreaterThanOrEqualTo(0)
            .WithMessage("The Salary Expected should be greater than or equal to 0");

        _ = RuleFor(static c => c.Location)
            .NotNull()
            .WithMessage("The Location is required")
            .NotEmpty()
            .WithMessage("The Location should not be empty")
            .MaximumLength(150)
            .WithMessage("The Location should not exceed 150 characters.");

        _ = RuleFor(static c => c.ProfilePicture)
            .NotNull()
            .WithMessage("The Profile Picture is required")
            .NotEmpty()
            .WithMessage("The Profile Picture should not be empty");

        _ = RuleFor(static c => c.PortfolioUrl)
            .NotNull()
            .WithMessage("The Portfolio URL is required")
            .NotEmpty()
            .WithMessage("The Portfolio URL should not be empty");

        _ = RuleFor(static c => c.SpecializationId)
            .NotEmpty()
            .WithMessage("The Specialization Id should not be empty")
            .NotNull()
            .WithMessage("The Specialization Id is required");

        _ = RuleFor(static c => c.Skills)
            .NotEmpty()
            .WithMessage("The Skills should not be empty")
            .NotNull()
            .WithMessage("The Skills are required")
            .Must(static skills => skills.Count > 0)
            .WithMessage("The Skills should have at least one skill.");

        _ = RuleFor(static c => c.SpokenLanguages)
            .NotEmpty()
            .WithMessage("The SpokenLanguages should not be empty")
            .NotNull()
            .WithMessage("The SpokenLanguages are required")
            .Must(static languages => languages.Count > 0)
            .WithMessage("The SpokenLanguages should have at least one language.");
    }
}
