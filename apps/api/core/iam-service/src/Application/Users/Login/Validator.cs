namespace Application.Users.Login;

using FluentValidation;

internal sealed class Validator : AbstractValidator<LoginUserCommand>
{
    public Validator()
    {
        _ = RuleFor(static c => c.Email).NotEmpty().NotNull();
        _ = RuleFor(static c => c.Password).NotEmpty().NotNull();
    }
}
