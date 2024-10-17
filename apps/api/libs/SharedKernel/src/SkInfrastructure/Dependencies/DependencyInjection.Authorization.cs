namespace SkInfrastructure.Dependencies;

using Microsoft.Extensions.DependencyInjection;

public static partial class DependencyInjection
{
    public static IServiceCollection AddAuthorizationInternal(this IServiceCollection services)
    {
        _ = services.AddAuthorization();

        return services;
    }
}
