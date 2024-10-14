namespace Infrastructure.Authentication;

using System.Net.Http.Json;
using Application.Authentication;
using Errors;
using SharedKernel.Results;

public class JwtProvider(HttpClient httpClient) : IJwtProvider
{
    public async Task<Result<string>> GetForCredentialsAsync(string email, string password)
    {
        var request = new
        {
            email,
            password,
            returnSecureToken = true,
        };

        HttpResponseMessage response = await httpClient.PostAsJsonAsync("", request);

        try
        {
            response.EnsureSuccessStatusCode();
        }
        catch (HttpRequestException)
        {
            return Result.Failure<string>(AuthenticationErrors.InvalidCredentials);
        }

        AuthToken? authToken = await response.Content.ReadFromJsonAsync<AuthToken>();

        return authToken?.IdToken != null
            ? authToken.IdToken
            : Result.Failure<string>(AuthenticationErrors.InvalidCredentials);
    }
}
