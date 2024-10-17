namespace Api.Gateway.Services;

using Consul;
using Ocelot.Logging;
using Ocelot.Provider.Consul;
using Ocelot.Provider.Consul.Interfaces;

public class MyConsulServiceBuilder(
    IHttpContextAccessor contextAccessor,
    IConsulClientFactory clientFactory,
    IOcelotLoggerFactory loggerFactory
) : DefaultConsulServiceBuilder(contextAccessor, clientFactory, loggerFactory)
{
    protected override string GetDownstreamHost(ServiceEntry entry, Node node)
    {
        return entry.Service.Address;
    }
}
