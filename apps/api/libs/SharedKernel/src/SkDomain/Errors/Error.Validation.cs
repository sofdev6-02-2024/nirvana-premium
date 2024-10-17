namespace SkDomain.Errors;

using Results;

public sealed record ValidationError : Error
{
    public ValidationError(Error[] errors)
        : base("Validation.General", "One or more validation errors occurred", ErrorType.Validation)
    {
        Errors = errors;
    }

    public Error[] Errors { get; }

    public static ValidationError FromResults(IEnumerable<Result> results)
    {
        return new(results.Where(static r => r.IsFailure).Select(static r => r.Error).ToArray());
    }
}
