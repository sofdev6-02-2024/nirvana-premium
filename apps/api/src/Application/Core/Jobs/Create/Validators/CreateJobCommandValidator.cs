namespace Application.Core.Jobs.Create.Validators;

using FluentValidation;

internal sealed class CreateJobCommandValidator : AbstractValidator<CreateJobCommand>
{
    public CreateJobCommandValidator()
    {
        RuleFor(c => c.Slug).NotEmpty().NotNull();
        RuleFor(c => c.Title).NotEmpty().NotNull();
        RuleFor(c => c.Type).NotEmpty().NotNull();
        RuleFor(c => c.LocationType).NotEmpty().NotNull();
        RuleFor(c => c.Salary).GreaterThan(0);
        RuleFor(c => c.CompanyName).NotEmpty().NotNull();
        RuleFor(c => c.Approved).NotNull();
    }
}
