namespace SkDomain.Errors;

public partial record Error
{
    public static Error Failure(string code, string description)
    {
        return new(code, description, ErrorType.Failure);
    }

    public static Error NotFound(string code, string description)
    {
        return new(code, description, ErrorType.NotFound);
    }

    public static Error Problem(string code, string description)
    {
        return new(code, description, ErrorType.Problem);
    }

    public static Error Conflict(string code, string description)
    {
        return new(code, description, ErrorType.Conflict);
    }

    public static Error Unauthorized(string code, string description)
    {
        return new(code, description, ErrorType.Unauthorized);
    }
}
