namespace Infrastructure.Authentication;

using System.Text.Json.Serialization;

public class AuthToken
{
    [JsonPropertyName("idToken")]
    public required string IdToken { get; init; }
}
