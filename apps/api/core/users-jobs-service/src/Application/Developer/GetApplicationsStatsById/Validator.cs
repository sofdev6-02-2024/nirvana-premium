namespace Application.Developer.GetApplicationsStatsById;

using FluentValidation;

internal sealed class Validator : AbstractValidator<GetApplicationsStatsByIdQuery>
{
    public Validator()
    {
        RuleFor(itm => itm.DeveloperId)
            .NotNull()
            .NotEmpty()
            .WithMessage("DeveloperId is required.");
    }
}
