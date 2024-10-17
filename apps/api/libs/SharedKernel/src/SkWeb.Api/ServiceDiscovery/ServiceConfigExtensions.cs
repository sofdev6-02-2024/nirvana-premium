namespace SkWeb.Api.ServiceDiscovery;

using System;
using Microsoft.Extensions.Configuration;

public static class ServiceConfigExtensions
{
    public static ServiceConfig GetServiceConfig(this IConfiguration configuration)
    {
        ServiceConfig serviceConfig =
            new()
            {
                Id = configuration.GetValue<string>("ServiceConfig:Id")!,
                Name = configuration.GetValue<string>("ServiceConfig:Name")!,
                ApiHost = configuration.GetValue<string>("ServiceConfig:ApiHost")!,
                Port = configuration.GetValue<int>("ServiceConfig:Port"),
                ConsulUrl = configuration.GetValue<Uri>("ServiceConfig:ConsulUrl")!,
            };

        return serviceConfig;
    }
}
