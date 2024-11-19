namespace SkInfrastructure.Dependencies;

using System.Reflection;
using Microsoft.Extensions.DependencyInjection;
using Seed;

public partial class DependencyInjection
{
    public static IServiceCollection AddSeedDataInternal(this IServiceCollection services,
        Assembly assembly)
    {
        IEnumerable<Type> types = assembly.GetTypes()
            .Where(type =>
                type is { IsAbstract: false, IsClass: true } &&
                typeof(ISeedEntity).IsAssignableFrom(type));

        foreach (Type type in types)
        {
            services.AddTransient(typeof(ISeedEntity), type);
        }

        return services;
    }
}
