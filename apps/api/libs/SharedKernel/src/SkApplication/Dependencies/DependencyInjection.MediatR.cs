namespace SkApplication.Dependencies;

using Microsoft.Extensions.DependencyInjection;
using SkApplication.Behaviors;

public static partial class DependencyInjection
{
    public static IServiceCollection AddMediatRInternal<T>(this IServiceCollection services)
    {
        return services.AddMediatR(static config =>
        {
            _ = config
                .RegisterServicesFromAssembly(typeof(T).Assembly)
                .AddOpenBehavior(typeof(RequestLoggingPipelineBehavior<,>))
                .AddOpenBehavior(typeof(ValidationPipelineBehavior<,>));
        });
    }
}
