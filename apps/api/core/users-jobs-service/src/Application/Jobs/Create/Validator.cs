namespace Application.Jobs.Create;

using Domain.Enums;
using FluentValidation;

internal sealed class Validator : AbstractValidator<CreateCommand>
{
    public Validator()
    {
        _ = RuleFor(static c => c.Title).NotEmpty().NotNull().MaximumLength(100);

        _ = RuleFor(static c => c.Description).NotEmpty().NotNull().MaximumLength(255);

        _ = RuleFor(static c => c.SalaryPerHour).GreaterThan(0);

        _ = RuleFor(static c => c.DueDate).NotEmpty().NotNull().GreaterThan(DateTime.UtcNow);

        _ = RuleFor(static c => c.Modality)
            .NotEmpty()
            .NotNull()
            .IsEnumName(typeof(Modality))
            .WithMessage(
                "Invalid modality the modality must be one of the following: 'Remote', 'OnSite' or 'Hybrid'"
            );

        _ = RuleFor(static c => c.Schedule)
            .NotEmpty()
            .NotNull()
            .IsEnumName(typeof(Schedule))
            .WithMessage(
                "Invalid schedule the schedule must be one of the following: 'FullTime' or 'PartTime'"
            );

        _ = RuleFor(static c => c.RecruiterId).NotEmpty().NotNull();

        _ = RuleFor(static c => c.Location).MaximumLength(255);
    }
}
