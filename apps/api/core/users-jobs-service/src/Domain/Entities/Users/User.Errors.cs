namespace Domain.Entities.Users;

using SkDomain.Errors;

public static class UserErrors
{
    public static Error UserNotFound(Guid id)
    {
        return Error.NotFound("Users.UserNotFound", $"User with Id: {id} was not found");
    }

    public static Error UserNotFoundByIdentityId(string identityId)
    {
        return Error.NotFound(
            "Users.UserNotFound",
            $"User with identity Id: {identityId} was not found"
        );
    }

    public static Error UserRepeatedIdentityId(string identityId)
    {
        return Error.Conflict(
            "Users.UserRepeatedIdentityId",
            $"User with identity Id: {identityId} already exists"
        );
    }

    public static Error UserRepeatedEmail(string email)
    {
        return Error.Conflict(
            "Users.UserRepeatedEmail",
            $"User with email: {email} already exists"
        );
    }
}
