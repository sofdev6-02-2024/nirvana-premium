namespace SkApplication.Authentication;

using SkDomain.Errors;

public static class AuthenticationErrors
{
    public static Error InvalidCredentials =>
        Error.Unauthorized("Authentication.InvalidCredentials", "Invalid credentials");
}
