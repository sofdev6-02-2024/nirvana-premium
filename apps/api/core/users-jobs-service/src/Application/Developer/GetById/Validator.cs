namespace Application.Developer.GetById;

using FluentValidation;

internal sealed class Validator : AbstractValidator<GetByIdQuery>
{
    public Validator()
    {
        RuleFor(v => v.DeveloperId).NotNull().NotEmpty().WithMessage("DeveloperId is required");
    }
}
