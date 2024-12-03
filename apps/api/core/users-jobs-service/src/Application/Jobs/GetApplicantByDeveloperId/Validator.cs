namespace Application.Jobs.GetApplicantByDeveloperId;

using FluentValidation;

internal sealed class Validator : AbstractValidator<GetApplicantByDeveloperIdQuery>
{
    public Validator()
    {
        RuleFor(validator => validator.DeveloperId)
            .NotEmpty()
            .WithMessage("DeveloperId is required");

        RuleFor(validator => validator.JobId)
            .NotEmpty()
            .WithMessage("JobId is required");
    }
}
