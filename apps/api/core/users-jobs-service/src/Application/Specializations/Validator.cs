namespace Application.Specializations;

using FluentValidation;

public sealed class Validator : AbstractValidator<GetAllQuery>
{
    public Validator()
    {
        _ = RuleFor( s => s).NotEmpty().WithMessage("No specializations found.");
    }
}
