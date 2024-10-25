namespace Infrastructure;

using Application.Persistent;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Persistent;
using SkInfrastructure.Dependencies;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(
        this IServiceCollection services,
        IConfiguration configuration
    )
    {
        return services
            .AddDatabase<IApplicationDbContext, ApplicationDbContext>(configuration)
            .AddHealthChecksInternal(configuration)
            .AddAuthorizationInternal()
            .AddAuthenticationInternal(configuration);
    }
}
