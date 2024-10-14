namespace SharedKernel.Results;

using System.Diagnostics.CodeAnalysis;
using Errors;

public class Result
{
    public Result(bool isSuccess, Error error)
    {
        if ((isSuccess && error != Error.None) || (!isSuccess && error == Error.None))
        {
            throw new ArgumentException("Invalid error", nameof(error));
        }

        IsSuccess = isSuccess;
        Error = error;
    }

    public bool IsSuccess { get; }

    public bool IsFailure => !IsSuccess;

    public Error Error { get; }

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

public class Result<TValue>(TValue? value, bool isSuccess, Error error) : Result(isSuccess, error)
{
    private readonly TValue? _value = value;

    [NotNull]
    public TValue Value =>
        IsSuccess
            ? _value!
            : throw new InvalidOperationException(
                "The value of a failure result can't be accessed."
            );

    public static implicit operator Result<TValue>(TValue? value)
    {
        return value is not null ? Success(value) : Failure<TValue>(Error.NullValue);
    }

    public static Result<TValue> ValidationFailure(Error error)
    {
        return new(default, false, error);
    }

    public TOut Match<TOut>(Func<TOut> onSuccess, Func<Result, TOut> onFailure)
    {
        return IsSuccess ? onSuccess() : onFailure(this);
    }

    public TOut Match<TOut>(Func<TValue, TOut> onSuccess, Func<Result<TValue>, TOut> onFailure)
    {
        return IsSuccess ? onSuccess(Value) : onFailure(this);
    }
}
