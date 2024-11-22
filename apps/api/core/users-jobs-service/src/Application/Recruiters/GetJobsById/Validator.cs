namespace Application.Recruiters.GetJobsById;

using FluentValidation;

internal sealed class Validator : AbstractValidator<GetJobsByIdQuery>
{
    public Validator()
    {
        _ = RuleFor(static c => c.RecruiterId).NotEmpty().NotNull();

        _ = RuleFor(static c => c.Page).NotEmpty().NotNull().GreaterThan(0);

        _ = RuleFor(static c => c.PageSize).NotEmpty().NotNull().GreaterThan(0);
    }
}
