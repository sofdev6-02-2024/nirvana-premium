namespace Application.Specializations;

using Domain.Attributes.Specializations;
using FluentValidation;

public sealed class Validator : AbstractValidator<List<Specialization>>
{
    public Validator()
    {
        _ = RuleFor( s => s).NotEmpty().WithMessage("No specializations found.");
    }
}
