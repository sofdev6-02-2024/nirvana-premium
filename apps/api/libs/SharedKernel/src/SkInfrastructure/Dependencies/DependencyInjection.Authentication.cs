namespace SkInfrastructure.Dependencies;

using System.Security.Claims;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;

#pragma warning disable CA5404
public static partial class DependencyInjection
{
    public static IServiceCollection AddAuthenticationInternal(
        this IServiceCollection services,
        IConfiguration configuration
    )
    {
        _ = services
            .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(o =>
            {
                o.Authority = configuration["Clerk:Authority"];

                o.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateAudience = false,
                    NameClaimType = ClaimTypes.NameIdentifier,
                };

                o.Events = new JwtBearerEvents
                {
                    OnTokenValidated = context =>
                    {
                        string? azp = context.Principal?.FindFirstValue("azp");

                        if (
                            string.IsNullOrEmpty(azp)
                            || (
                                azp != configuration["Clerk:LocalAuthorizedParty"]
                                && azp != configuration["Clerk:ClerkAuthorizedParty"]
                            )
                        )
                            context.Fail("AZP Claim is invalid or missing");

                        return Task.CompletedTask;
                    },
                };
            });

        return services;
    }
}
