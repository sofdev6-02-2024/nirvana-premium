namespace SkInfrastructure.Dependencies;

using Configurations;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.DependencyInjection;

public static partial class DependencyInjection
{
    public static IServiceCollection AddAuthenticationInternal(this IServiceCollection services)
    {
        _ = services
            .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(static options =>
            {
                options.Authority = Environment.GetEnvironmentVariable(Constants.Authority)!;
                options.Audience = Environment.GetEnvironmentVariable(Constants.Audience)!;
                options.TokenValidationParameters.ValidIssuer = Environment.GetEnvironmentVariable(
                    Constants.Issuer
                )!;
            });

        return services;
    }
}
