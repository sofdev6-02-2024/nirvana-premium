namespace SkInfrastructure.Dependencies;

using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Configurations;

public static partial class DependencyInjection
{
    public static IServiceCollection AddHealthChecksInternal(
        this IServiceCollection services,
        IConfiguration configuration
    )
    {
        _ = services
            .AddHealthChecks()
            .AddNpgSql(configuration.GetConnectionString(Constants.ConnectionString)!);

        return services;
    }
}
