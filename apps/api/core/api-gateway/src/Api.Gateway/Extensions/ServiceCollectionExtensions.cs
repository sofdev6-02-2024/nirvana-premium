namespace Api.Gateway.Extensions;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddCorsInternal(this IServiceCollection services)
    {
        return services.AddCors(static options =>
        {
            options.AddDefaultPolicy(static builder =>
            {
                _ = builder.AllowAnyMethod().AllowAnyHeader().AllowAnyOrigin();
            });
        });
    }
}
