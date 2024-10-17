namespace Application.Jobs.GetBySlug;

using FluentValidation;

internal sealed class Validator : AbstractValidator<GetJobBySlugQuery>
{
    public Validator()
    {
        _ = RuleFor(static c => c.Slug).NotEmpty().NotNull();
    }
}
