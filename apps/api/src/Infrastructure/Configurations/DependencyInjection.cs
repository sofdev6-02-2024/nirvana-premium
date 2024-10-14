namespace Infrastructure.Configurations;

using Application.Authentication;
using Application.Persistent;
using Authentication;
using FirebaseAdmin;
using Google.Apis.Auth.OAuth2;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Persistent;
using Persistent.Schemas;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(
        this IServiceCollection services,
        IConfiguration configuration
    )
    {
        return services
            .AddFirebase(configuration)
            .AddServices()
            .AddDatabase(configuration)
            .AddHealth(configuration)
            .AddAuthenticationInternal()
            .AddAutherizationInternal();
    }

    private static IServiceCollection AddFirebase(
        this IServiceCollection services,
        IConfiguration configuration
    )
    {
        FirebaseApp.Create(
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

        return services;
    }

    private static IServiceCollection AddServices(this IServiceCollection services)
    {
        services.AddSingleton<IAuthenticationService, AuthenticationService>();
        services.AddHttpClient<IJwtProvider, JwtProvider>(httpClient =>
        {
            string? apiKey = Environment.GetEnvironmentVariable(Constants.FirebaseApiKey);

            if (apiKey is null)
            {
                throw new InvalidOperationException("Firebase API key is not set");
            }

            httpClient.BaseAddress = new Uri(Constants.FirebaseAuthUrl + apiKey);
        });

        return services;
    }

    private static IServiceCollection AddDatabase(
        this IServiceCollection services,
        IConfiguration configuration
    )
    {
        string? connectionString = configuration.GetConnectionString(Constants.ConnectionString)!;

        services.AddDbContext<ApplicationDbContext>(options =>
            options
                .UseNpgsql(
                    connectionString,
                    npgsqlOptions =>
                        npgsqlOptions.MigrationsHistoryTable(
                            HistoryRepository.DefaultTableName,
                            Schema.Default
                        )
                )
                .UseSnakeCaseNamingConvention()
        );

        services.AddScoped<IApplicationDbContext>(sp =>
            sp.GetRequiredService<ApplicationDbContext>()
        );

        return services;
    }

    private static IServiceCollection AddHealth(
        this IServiceCollection services,
        IConfiguration configuration
    )
    {
        services
            .AddHealthChecks()
            .AddNpgSql(configuration.GetConnectionString(Constants.ConnectionString)!);

        return services;
    }

    private static IServiceCollection AddAuthenticationInternal(this IServiceCollection services)
    {
        services
            .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(options =>
            {
                options.Authority = Environment.GetEnvironmentVariable(Constants.Authority)!;
                options.Audience = Environment.GetEnvironmentVariable(Constants.Audience)!;
                options.TokenValidationParameters.ValidIssuer = Environment.GetEnvironmentVariable(
                    Constants.Issuer
                )!;
            });

        return services;
    }

    private static IServiceCollection AddAutherizationInternal(this IServiceCollection services)
    {
        services.AddAuthorization();

        return services;
    }
}
