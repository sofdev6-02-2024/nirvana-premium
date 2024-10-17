namespace SkDomain.Results;

public partial class Result<TValue>
{
    public TOut Match<TOut>(Func<TOut> onSuccess, Func<Result, TOut> onFailure)
    {
        return IsSuccess ? onSuccess() : onFailure(this);
    }

    public TOut Match<TOut>(Func<TValue, TOut> onSuccess, Func<Result<TValue>, TOut> onFailure)
    {
        return IsSuccess ? onSuccess(Value) : onFailure(this);
    }
}
