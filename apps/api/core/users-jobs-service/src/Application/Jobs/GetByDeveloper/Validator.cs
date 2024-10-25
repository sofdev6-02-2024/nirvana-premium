namespace Application.Jobs.GetByDeveloper;

using FluentValidation;

internal sealed class Validator : AbstractValidator<GetByDeveloperQuery>
{
    public Validator()
    {
        _ = RuleFor(static c => c.DeveloperId).NotEmpty().NotNull();
        _ = RuleFor(static c => c.Page).NotEmpty().NotNull().GreaterThan(0);
        _ = RuleFor(static c => c.PageSize).NotEmpty().NotNull().GreaterThan(0);
    }
}
