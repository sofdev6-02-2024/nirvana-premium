namespace Application.Authentication;

using SharedKernel.Results;

public interface IJwtProvider
{
    Task<Result<string>> GetForCredentialsAsync(string email, string password);
}
