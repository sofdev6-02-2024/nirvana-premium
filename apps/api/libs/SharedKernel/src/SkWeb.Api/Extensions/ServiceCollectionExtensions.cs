namespace SkWeb.Api.Extensions;

using Microsoft.OpenApi.Models;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddSwaggerGenWithAuth(
        this IServiceCollection services,
        IConfiguration configuration,
        string title,
        string description,
        string version
    )
    {
        return services.AddSwaggerGen(o =>
        {
            o.SwaggerDoc(
                "v1",
                new OpenApiInfo
                {
                    Title = title,
                    Version = version,
                    Description = description,
                }
            );

            o.CustomSchemaIds(id => id.FullName!.Replace('+', '-'));

            o.AddSecurityDefinition(
                "Keycloak",
                new OpenApiSecurityScheme
                {
                    Type = SecuritySchemeType.OAuth2,
                    Flows = new OpenApiOAuthFlows
                    {
                        Implicit = new OpenApiOAuthFlow
                        {
                            AuthorizationUrl = new Uri(configuration["Keycloak:AuthorizationUrl"]!),
                            Scopes = new Dictionary<string, string>
                            {
                                { "openid", "openid" },
                                { "profile", "profile" },
                            },
                        },
                    },
                }
            );

            OpenApiSecurityRequirement securityRequirement =
                new()
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference
                            {
                                Id = "Keycloak",
                                Type = ReferenceType.SecurityScheme,
                            },
                            In = ParameterLocation.Header,
                            Name = "Bearer",
                            Scheme = "Bearer",
                        },
                        []
                    },
                };

            o.AddSecurityRequirement(securityRequirement);
        });
    }
}
