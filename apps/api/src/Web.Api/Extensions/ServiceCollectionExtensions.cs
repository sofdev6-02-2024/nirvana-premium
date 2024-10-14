namespace Web.Api.Extensions;

using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.OpenApi.Models;

internal static class ServiceCollectionExtensions
{
    internal static IServiceCollection AddCustomCors(this IServiceCollection services)
    {
        services.AddCors(options =>
        {
            options.AddDefaultPolicy(builder =>
            {
                builder.AllowAnyMethod().AllowAnyHeader().AllowAnyOrigin();
            });
        });

        return services;
    }

    internal static IServiceCollection AddSwaggerGenWithAuth(this IServiceCollection services)
    {
        services.AddSwaggerGen(o =>
        {
            o.SwaggerDoc(
                "v1",
                new OpenApiInfo
                {
                    Title = "Tu Primera Chamba API",
                    Version = "v1",
                    Description =
                        "The Tu Primera Chamba API provides a comprehensive set of endpoints to interact with the Tu Primera Chamba job portal. This API allows users to manage job listings, applications, user profiles, and other related functionalities. It is designed to facilitate seamless integration with the job portal, enabling developers to build robust applications and services around the job search and recruitment process.",
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

        return services;
    }
}
