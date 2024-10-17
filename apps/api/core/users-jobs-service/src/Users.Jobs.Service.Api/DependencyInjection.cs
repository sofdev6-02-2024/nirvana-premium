namespace Users.Jobs.Service.Api;

using SkWeb.Api.Dependencies;

public static class DependencyInjection
{
    public static IServiceCollection AddPresentation(this IServiceCollection services)
    {
        return services.AddSwaggerInternal().AddExceptionHandlerInternal();
    }
}
