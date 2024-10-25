namespace SkWeb.Api.Extensions;

using Microsoft.OpenApi.Models;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddSwaggerGen(
        this IServiceCollection services,
        IConfiguration config,
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

            o.CustomSchemaIds(static id => id.FullName!.Replace('+', '-'));

            OpenApiSecurityScheme securityScheme =
                new()
                {
                    Type = SecuritySchemeType.OAuth2,
                    Flows = new OpenApiOAuthFlows
                    {
                        Implicit = new OpenApiOAuthFlow
                        {
                            AuthorizationUrl = new Uri(config["Keycloak:AuthorizationUrl"]!),
                            Scopes = new Dictionary<string, string>
                            {
                                { "openid", "OpenId" },
                                { "profile", "profile" },
                            },
                        },
                    },
                };

            o.AddSecurityDefinition("keycloak", securityScheme);

            OpenApiSecurityRequirement securityRequirement =
                new()
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference
                            {
                                Id = "keycloak",
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
