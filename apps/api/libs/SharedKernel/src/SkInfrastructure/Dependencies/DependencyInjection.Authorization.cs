namespace SkInfrastructure.Dependencies;

using Authorization;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.DependencyInjection;

public static partial class DependencyInjection
{
    public static IServiceCollection AddAuthorizationInternal(this IServiceCollection services)
    {
        services.AddAuthorization(options =>
        {
            options.AddPolicy(
                Permissions.Recruiter,
                policy => policy.Requirements.Add(new RoleRequirement("recruiter"))
            );

            options.AddPolicy(
                Permissions.Developer,
                policy => policy.Requirements.Add(new RoleRequirement("developer"))
            );
        });

        services.AddSingleton<IAuthorizationHandler, RoleRequirementHandler>();

        return services;
    }
}
