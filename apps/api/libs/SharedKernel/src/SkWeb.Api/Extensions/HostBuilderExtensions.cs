namespace SkWeb.Api.Extensions;

using Serilog;

public static class HostBuilderExtensions
{
    public static IHostBuilder UseSerilogInternal(this IHostBuilder hostBuilder)
    {
        return hostBuilder.UseSerilog(
            static (context, loggerConfig) =>
                loggerConfig.ReadFrom.Configuration(context.Configuration)
        );
    }
}
