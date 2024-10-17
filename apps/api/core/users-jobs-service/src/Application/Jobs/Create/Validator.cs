namespace Application.Jobs.Create;

using FluentValidation;

internal sealed class CreateJobCommandValidator : AbstractValidator<CreateJobCommand>
{
    public CreateJobCommandValidator()
    {
        _ = RuleFor(static c => c.Slug).NotEmpty().NotNull();
        _ = RuleFor(static c => c.Title).NotEmpty().NotNull();
        _ = RuleFor(static c => c.Type).NotEmpty().NotNull();
        _ = RuleFor(static c => c.LocationType).NotEmpty().NotNull();
        _ = RuleFor(static c => c.Salary).GreaterThan(0);
        _ = RuleFor(static c => c.CompanyName).NotEmpty().NotNull();
        _ = RuleFor(static c => c.Approved).NotNull();
    }
}
