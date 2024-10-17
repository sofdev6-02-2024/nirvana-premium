namespace SkApplication.Authentication;

using SkDomain.Results;

public interface IJwtProvider
{
    Task<Result<string>> GetForCredentialsAsync(string email, string password);
}
