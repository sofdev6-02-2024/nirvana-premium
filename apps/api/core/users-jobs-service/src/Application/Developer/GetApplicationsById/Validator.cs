namespace Application.Developer.GetApplicationsById;

using Domain.Enums;
using FluentValidation;

internal sealed class Validator : AbstractValidator<GetApplicationsByIdQuery>
{
    public Validator()
    {
        RuleFor(itm => itm.DeveloperId).NotNull().NotEmpty().WithMessage("DeveloperId is required");

        RuleFor(itm => itm.Page)
            .NotNull()
            .NotEmpty()
            .GreaterThan(0)
            .WithMessage("Page must be greater than 0");

        RuleFor(itm => itm.PageSize)
            .NotNull()
            .NotEmpty()
            .GreaterThan(0)
            .WithMessage("PageSize must be greater than 0");

        _ = RuleFor(item => item.Status)
            .IsEnumName(typeof(ApplicantStatus))
            .WithMessage(
                "Status should be one of the following: Published, Accepted, Rejected, Viewed"
            );
    }
}
