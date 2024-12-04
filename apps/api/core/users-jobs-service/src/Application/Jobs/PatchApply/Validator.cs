namespace Application.Jobs.PatchApply;

using Domain.Enums;
using FluentValidation;

internal sealed class Validator : AbstractValidator<PatchCommand>
{
    public Validator()
    {
        _ = RuleFor(x => x.JobId)
            .NotNull()
            .WithMessage("JobId is required.")
            .NotEmpty()
            .WithMessage("JobId is required.");

        _ = RuleFor(x => x.DeveloperId)
            .NotNull()
            .WithMessage("DeveloperId is required.")
            .NotEmpty()
            .WithMessage("DeveloperId is required.");

        _ = RuleFor(x => x.Status)
            .NotNull()
            .WithMessage("Status is required.")
            .NotEmpty()
            .WithMessage("Status is required.")
            .IsEnumName(typeof(ApplicantStatus))
            .WithMessage("Status should be Published, Viewed, Accepted, Rejected or All.");
    }
}
