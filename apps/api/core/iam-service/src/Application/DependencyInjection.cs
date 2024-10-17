namespace Application;

using Microsoft.Extensions.DependencyInjection;
using SkApplication.Dependencies;

public interface IApplicationAssemblyMarker { }

public static class DependencyInjection
{
    public static IServiceCollection AddApplication(this IServiceCollection services)
    {
        return services
            .AddMediatRInternal<IApplicationAssemblyMarker>()
            .AddValidatorsInternal<IApplicationAssemblyMarker>();
    }
}
