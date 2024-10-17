namespace SkApplication.Dependencies;

using FluentValidation;
using Microsoft.Extensions.DependencyInjection;

public static partial class DependencyInjection
{
    public static IServiceCollection AddValidatorsInternal<T>(this IServiceCollection services)
    {
        return services.AddValidatorsFromAssembly(typeof(T).Assembly, includeInternalTypes: true);
    }
}
