namespace Application.Recruiters.GetApplicantsByJobId;

using Domain.Enums;
using FluentValidation;

internal sealed class Validator : AbstractValidator<GetApplicantsByJobIdQuery>
{
    public Validator()
    {
        _ = RuleFor(static c => c.JobId)
            .NotEmpty()
            .NotNull()
            .WithMessage("JobId must not be empty");

        _ = RuleFor(static c => c.RecruiterId)
            .NotEmpty()
            .NotNull()
            .WithMessage("RecruiterId must not be empty");

        _ = RuleFor(static c => c.Page)
            .NotEmpty()
            .NotNull()
            .GreaterThan(0)
            .WithMessage("Page must be greater than 0");

        _ = RuleFor(static c => c.PageSize)
            .NotEmpty()
            .NotNull()
            .GreaterThan(0)
            .WithMessage("PageSize must be greater than 0");

        _ = RuleFor(static c => c.Status)
            .IsEnumName(typeof(ApplicantStatus))
            .WithMessage(
                "Status should be one of the following: Published, Accepted, Rejected, Viewed"
            );
    }
}
