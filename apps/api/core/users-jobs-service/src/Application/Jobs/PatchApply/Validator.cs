namespace Application.Jobs.PatchApply;

using Domain.Enums;
using FluentValidation;

internal sealed class Validator : AbstractValidator<PatchCommand>
{
    public Validator()
    {
        _ = RuleFor(x => x.JobId).NotEmpty().WithMessage("JobId is required.").NotNull()
            .WithMessage("JobId is required.");
        _ = RuleFor(x => x.DeveloperId).NotEmpty().WithMessage("DeveloperId is required.")
            .NotNull().WithMessage("DeveloperId is required.");
        _ = RuleFor(x => x.Status).NotEmpty().WithMessage("Status is required.").NotNull()
            .WithMessage("Status is required.").IsEnumName(typeof(ApplicantStatus))
            .WithMessage("Status should be Published, Viewed, Accepted, Rejected or All.");
    }
}
