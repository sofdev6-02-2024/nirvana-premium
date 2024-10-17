namespace Application.Users.Register;

using Domain.Users;
using FluentValidation;

internal sealed class Validator : AbstractValidator<RegisterUserCommand>
{
    public Validator()
    {
        _ = RuleFor(static c => c.FirstName).NotEmpty().NotNull().MaximumLength(100);

        _ = RuleFor(static c => c.LastName).NotEmpty().NotNull().MaximumLength(100);

        _ = RuleFor(static c => c.Email).NotEmpty().NotNull().EmailAddress().MaximumLength(255);

        _ = RuleFor(static c => c.Role)
            .NotEmpty()
            .NotNull()
            .IsEnumName(typeof(UserRole))
            .WithMessage(
                "Invalid role the role must be one of the following: 'Admin', 'Applicant' or 'Recruiter'"
            );

        _ = RuleFor(static c => c.Password)
            .NotEmpty()
            .NotNull()
            .Matches(@"^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$")
            .WithMessage(
                "Password must contain at least one uppercase letter, one number, and be at least 8 characters long"
            );

        _ = RuleFor(static c => c.ConfirmPassword).Equal(static c => c.Password);
    }
}
