namespace SkInfrastructure.Dependencies;

using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;

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
                o.RequireHttpsMetadata = false;
                o.Audience = configuration["Authentication:Audience"];
                o.MetadataAddress = configuration["Authentication:MetadataAddress"]!;
                o.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidIssuer = configuration["Authentication:ValidIssuer"],
                };
            });

        return services;
    }
}
