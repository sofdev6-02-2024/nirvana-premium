namespace Application.Jobs.GetById;

using FluentValidation;

internal sealed class Validator : AbstractValidator<GetByIdQuery>
{
    public Validator()
    {
        _ = RuleFor(static c => c.JobId).NotEmpty().NotNull();
    }
}
