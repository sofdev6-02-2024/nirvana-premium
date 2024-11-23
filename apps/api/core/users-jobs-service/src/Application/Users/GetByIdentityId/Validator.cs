namespace Application.Users.GetByIdentityId;

using FluentValidation;

internal sealed class Validator : AbstractValidator<GetByIdentityIdQuery>
{
    public Validator()
    {
        RuleFor(v => v.IdentityId)
            .NotNull()
            .WithMessage("IdentityId is required.")
            .NotEmpty()
            .WithMessage("IdentityId mus not be empty");
    }
}
