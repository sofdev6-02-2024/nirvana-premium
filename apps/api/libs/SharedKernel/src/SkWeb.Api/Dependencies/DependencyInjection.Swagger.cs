namespace SkWeb.Api.Dependencies;

public static partial class DependencyInjection
{
    public static IServiceCollection AddSwaggerInternal(this IServiceCollection services)
    {
        _ = services.AddEndpointsApiExplorer();
        _ = services.AddSwaggerGen();

        return services;
    }
}
