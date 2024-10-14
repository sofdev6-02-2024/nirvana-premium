namespace Infrastructure.Authentication.Errors;

using SharedKernel.Errors;

public static class AuthenticationErrors
{
    public static Error InvalidCredentials =>
        Error.Unauthorized("Authentication.InvalidCredentials", "Invalid credentials");
}
