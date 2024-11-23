namespace Domain.Entities.Users;

using SkDomain.Errors;

public static class UserErrors
{
    public static Error UserNotFoundByIdentityId(string identityId)
    {
        return Error.NotFound(
            "Users.UserNotFound",
            $"User with identity Id: {identityId} was not found"
        );
    }
}
