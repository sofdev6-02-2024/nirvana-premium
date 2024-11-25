namespace Application.Users.Post;

using Domain.Enums;
using FluentValidation;

internal sealed class Validator : AbstractValidator<PostCommand>
{
    public Validator()
    {
        RuleFor(c => c.IdentityId).NotNull().NotEmpty().WithMessage("IdentityId is required");

        RuleFor(c => c.Role)
            .IsEnumName(typeof(UserRole))
            .WithMessage("Role is invalid, must be one of the following: 'Recruiter', 'Developer'");

        RuleFor(c => c.Email)
            .NotNull()
            .NotEmpty()
            .WithMessage("Email is required")
            .EmailAddress()
            .WithMessage("Email is invalid");
    }
}
