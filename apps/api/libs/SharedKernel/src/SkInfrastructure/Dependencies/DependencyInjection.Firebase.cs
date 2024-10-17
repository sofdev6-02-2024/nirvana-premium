namespace SkInfrastructure.Dependencies;

using Authentication;
using FirebaseAdmin;
using Google.Apis.Auth.OAuth2;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using SkApplication.Authentication;
using SkInfrastructure.Configurations;

public static partial class DependencyInjection
{
    public static IServiceCollection AddFirebase(
        this IServiceCollection services,
        IConfiguration configuration
    )
    {
        _ = FirebaseApp.Create(
            new AppOptions
            {
                Credential = GoogleCredential.FromFile(
                    Path.Combine(
                        Directory.GetCurrentDirectory(),
                        configuration[Constants.FirebaseFilePath]!
                    )
                ),
            }
        );

        _ = services
            .AddSingleton<IAuthenticationService, AuthenticationService>()
            .AddHttpClient<IJwtProvider, JwtProvider>(static httpClient =>
            {
                string? apiKey =
                    Environment.GetEnvironmentVariable(Constants.FirebaseApiKey)
                    ?? throw new InvalidOperationException("Firebase API key is not set");

                httpClient.BaseAddress = new Uri(Constants.FirebaseAuthUrl + apiKey);
            });

        return services;
    }
}
