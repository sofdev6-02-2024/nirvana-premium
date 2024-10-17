namespace Application.Users.Register;

using FluentValidation;

internal sealed class Validator : AbstractValidator<RegisterUserCommand>
{
    public Validator()
    {
        _ = RuleFor(static c => c.FirstName).NotEmpty().NotNull();
        _ = RuleFor(static c => c.LastName).NotEmpty().NotNull();
        _ = RuleFor(static c => c.Email).NotEmpty().NotNull().EmailAddress();
        _ = RuleFor(static c => c.Password).NotEmpty().NotNull().MinimumLength(8);
    }
}
