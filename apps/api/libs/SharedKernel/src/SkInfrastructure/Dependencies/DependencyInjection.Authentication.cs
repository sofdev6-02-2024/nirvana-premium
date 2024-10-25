namespace SkInfrastructure.Dependencies;

using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

public static partial class DependencyInjection
{
    public static IServiceCollection AddAuthenticationInternal(
        this IServiceCollection services,
        IConfiguration config
    )
    {
        _ = services
            .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(o =>
            {
                o.RequireHttpsMetadata = false;

                o.Audience = config["Jwt:Audience"];
                o.MetadataAddress = config["Jwt:MetadataAddress"]!;

                o.TokenValidationParameters = new() { ValidIssuer = config["Jwt:Issuer"] };
            });

        return services;
    }
}
