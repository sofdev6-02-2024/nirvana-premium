namespace Application.Authentication;

using SharedKernel.Results;

public interface IAuthenticationService
{
    Task<Result<string>> RegisterAsync(string email, string password);
}
