namespace SkInfrastructure.Authentication;

using System.Net.Http.Json;
using System.Text.Json.Serialization;
using SkApplication.Authentication;
using SkDomain.Results;

public sealed class JwtProvider(HttpClient httpClient) : IJwtProvider
{
    internal sealed class AuthToken
    {
        [JsonPropertyName("idToken")]
        public required string IdToken { get; init; }
    }

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
            _ = response.EnsureSuccessStatusCode();
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
