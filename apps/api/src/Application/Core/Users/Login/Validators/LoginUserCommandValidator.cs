namespace Application.Core.Users.Login.Validators;

using FluentValidation;

internal sealed class LoginUserCommandValidator : AbstractValidator<LoginUserCommand>
{
    public LoginUserCommandValidator()
    {
        RuleFor(c => c.Email).NotEmpty().NotNull();
        RuleFor(c => c.Password).NotEmpty().NotNull();
    }
}
