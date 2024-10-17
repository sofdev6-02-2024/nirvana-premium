namespace SkApplication.Authentication;

using SkDomain.Results;

public interface IAuthenticationService
{
    Task<Result<string>> RegisterAsync(string email, string password);
}
