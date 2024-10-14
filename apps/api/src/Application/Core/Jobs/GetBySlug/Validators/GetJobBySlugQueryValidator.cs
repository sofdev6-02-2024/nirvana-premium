namespace Application.Core.Jobs.GetBySlug.Validators;

using FluentValidation;

internal sealed class GetJobBySlugQueryValidator : AbstractValidator<GetJobBySlugQuery>
{
    public GetJobBySlugQueryValidator()
    {
        RuleFor(c => c.Slug).NotEmpty().NotNull();
    }
}
