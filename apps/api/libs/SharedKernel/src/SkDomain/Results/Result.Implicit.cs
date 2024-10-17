namespace SkDomain.Results;

using Errors;

public partial class Result<TValue>
{
    public static implicit operator Result<TValue>(TValue? value)
    {
        return value is not null ? Success(value) : Failure<TValue>(Error.NullValue);
    }
}
