namespace Application.Recruiters.GetAll;

using FluentValidation;

internal sealed class Validator : AbstractValidator<GetAllQuery>
{
    public Validator()
    {
        _ = RuleFor(static c => c.Page).NotEmpty().NotNull().GreaterThan(0);

        _ = RuleFor(static c => c.PageSize).NotEmpty().NotNull().GreaterThan(0);
    }
}
