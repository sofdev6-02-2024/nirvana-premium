namespace Application.Jobs.PostApply;

using Domain.Enums;
using FluentValidation;

internal sealed class Validator : AbstractValidator<PostCommand>
{
    public Validator()
    {
        _ = RuleFor(static c => c.DeveloperId)
            .NotEmpty()
            .WithMessage("The Developer Id should not be empty")
            .NotNull()
            .WithMessage("The Developer Id is required");

        _ = RuleFor(static c => c.JobId)
            .NotEmpty()
            .WithMessage("The Job Id should not be empty")
            .NotNull()
            .WithMessage("The Job Id is required");

        _ = RuleFor(static c => c.Status)
            .NotEmpty()
            .WithMessage("The Applicant Status should not be empty")
            .NotNull()
            .WithMessage("The Applicant Status is required")
            .IsEnumName(typeof(ApplicantStatus))
            .WithMessage("The Applicant Status should be Published, Viewed, Rejected, or Accepted");

    }
}
