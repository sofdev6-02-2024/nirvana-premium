namespace Application.Jobs.PatchApply;

using Domain.Enums;
using FluentValidation;

public sealed class Validator : AbstractValidator<PatchCommand>
{
    public Validator()
    {
        RuleFor(x => x.Status).NotEmpty().WithMessage("Status is required.").NotNull()
            .WithMessage("Status is required.").IsEnumName(typeof(ApplicantStatus))
            .WithMessage("Status should be Published, Viewed, Accepted, Rejected or All.");
    }
}
