namespace Application.Recruiters.Post;

using FluentValidation;

internal sealed class Validator : AbstractValidator<PostCommand>
{
    public Validator()
    {
        RuleFor(c => c.UserId).NotNull().NotEmpty().WithMessage("UserId is required");

        RuleFor(c => c.Name).NotNull().NotEmpty().WithMessage("Name is required");

        RuleFor(c => c.Location).NotNull().NotEmpty().WithMessage("Location is required");

        RuleFor(c => c.ProfilePicture)
            .NotNull()
            .NotEmpty()
            .WithMessage("ProfilePicture is required");
    }
}
