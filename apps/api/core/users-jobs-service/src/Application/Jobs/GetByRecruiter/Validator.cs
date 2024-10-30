namespace Application.Jobs.GetByRecruiter;

using FluentValidation;

internal sealed class Validator : AbstractValidator<GetByRecruiterQuery>
{
    public Validator()
    {
        _ = RuleFor(static c => c.RecruiterId).NotEmpty().NotNull();
    }
}
