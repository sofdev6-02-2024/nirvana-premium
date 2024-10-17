namespace SkDomain.Results;

using Errors;

public partial class Result
{
    public static Result Success()
    {
        return new(true, Error.None);
    }

    public static Result<TValue> Success<TValue>(TValue value)
    {
        return new(value, true, Error.None);
    }

    public static Result Failure(Error error)
    {
        return new(false, error);
    }

    public static Result<TValue> Failure<TValue>(Error error)
    {
        return new(default, false, error);
    }
}

public partial class Result<TValue>
{
    public static Result<TValue> ValidationFailure(Error error)
    {
        return new(default, false, error);
    }
}
