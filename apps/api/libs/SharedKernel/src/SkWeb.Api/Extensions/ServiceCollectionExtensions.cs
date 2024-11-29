namespace SkWeb.Api.Extensions;

using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.OpenApi.Models;
using OutputCaching;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddSwaggerGenWithAuth(
        this IServiceCollection services,
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

            OpenApiSecurityScheme securityScheme =
                new()
                {
                    Name = "JWT Authentication",
                    Description = "Enter your JWT token in this field",
                    In = ParameterLocation.Header,
                    Type = SecuritySchemeType.Http,
                    Scheme = JwtBearerDefaults.AuthenticationScheme,
                    BearerFormat = "JWT",
                };

            o.AddSecurityDefinition(JwtBearerDefaults.AuthenticationScheme, securityScheme);

            OpenApiSecurityRequirement securityRequirement =
                new()
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference
                            {
                                Type = ReferenceType.SecurityScheme,
                                Id = JwtBearerDefaults.AuthenticationScheme,
                            },
                        },
                        []
                    },
                };

            o.AddSecurityRequirement(securityRequirement);
        });
    }

    public static IServiceCollection AddRedisCache(
        this IServiceCollection services,
        IConfiguration configuration
    )
    {
        services.AddOutputCache(options =>
        {
            options.AddBasePolicy(
                b => b.AddPolicy<CustomPolicy>().SetCacheKeyPrefix("custom-"),
                true
            );
        });

        services.AddStackExchangeRedisOutputCache(options =>
        {
            options.Configuration = configuration.GetConnectionString("Redis");
            options.InstanceName = configuration["Redis:InstanceName"];
        });

        return services;
    }
}
