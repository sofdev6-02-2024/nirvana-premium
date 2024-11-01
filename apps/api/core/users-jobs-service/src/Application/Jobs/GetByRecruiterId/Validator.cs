namespace Application.Jobs.GetByRecruiterId;

using FluentValidation;

internal sealed class Validator : AbstractValidator<GetByRecruiterIdQuery>
{
    public Validator()
    {
        _ = RuleFor(static c => c.RecruiterId).NotEmpty().NotNull();

        _ = RuleFor(static c => c.Page).NotEmpty().NotNull().GreaterThan(0);

        _ = RuleFor(static c => c.PageSize).NotEmpty().NotNull().GreaterThan(0);
    }
}
