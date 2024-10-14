namespace Application.Core.Users.Register.Validators;

using FluentValidation;

internal sealed class RegisterUserCommandValidator : AbstractValidator<RegisterUserCommand>
{
    public RegisterUserCommandValidator()
    {
        RuleFor(c => c.FirstName).NotEmpty().NotNull();
        RuleFor(c => c.LastName).NotEmpty().NotNull();
        RuleFor(c => c.Email).NotEmpty().NotNull().EmailAddress();
        RuleFor(c => c.Password).NotEmpty().NotNull().MinimumLength(8);
    }
}
