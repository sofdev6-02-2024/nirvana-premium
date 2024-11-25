namespace Application.Recruiters.GetApplicationsStatsByJobId;

using FluentValidation;

internal sealed class Validator : AbstractValidator<GetApplicationsStatsByJobIdQuery>
{
    public Validator()
    {
        RuleFor(q => q.JobId).NotNull().NotEmpty().WithMessage("JobId is required");

        RuleFor(q => q.RecruiterId).NotNull().NotEmpty().WithMessage("RecruiterId is required");
    }
}
