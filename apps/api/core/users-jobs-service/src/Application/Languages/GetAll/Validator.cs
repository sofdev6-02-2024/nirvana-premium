namespace Application.Languages.GetAll;

using FluentValidation;

public sealed class Validator : AbstractValidator<GetAllQuery>
{
    public Validator()
    {
        _ = RuleFor( s => s).NotEmpty().WithMessage("No languages found.");
    }
}
