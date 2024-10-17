namespace SkWeb.Api.ServiceDiscovery;

using Consul;

public static class ConsulExtensions
{
    public static IServiceCollection AddConsulInternal(
        this IServiceCollection services,
        ServiceConfig serviceConfig
    )
    {
        _ = services.AddSingleton(serviceConfig);

        _ = services.AddSingleton<IConsulClient, ConsulClient>(p =>
            new(config =>
            {
                config.Address = serviceConfig.ConsulUrl;
            })
        );

        _ = services.AddSingleton<IHostedService, ServiceDiscoveryHostedService>();

        return services;
    }
}
