namespace SkWeb.Api.Dependencies;

using Infrastructure;

public static partial class DependencyInjection
{
    public static IServiceCollection AddExceptionHandlerInternal(this IServiceCollection services)
    {
        _ = services.AddExceptionHandler<GlobalExceptionHandler>();
        _ = services.AddProblemDetails();

        return services;
    }
}
