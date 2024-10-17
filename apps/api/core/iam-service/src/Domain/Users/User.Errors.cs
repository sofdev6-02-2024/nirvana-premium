namespace Domain.Users;

using SkDomain.Errors;

public static class UserErrors
{
    public static Error NotFound(Guid userId)
    {
        return Error.NotFound("Users.NotFound", $"The user with the Id = '{userId}' was not found");
    }

    public static readonly Error EmailNotUnique = Error.Conflict(
        "Users.EmailNotUnique",
        "The provided email is not unique"
    );

    public static readonly Error InvalidRole = Error.Problem(
        "Users.InvalidRole",
        "The provided role is invalid"
    );
}
