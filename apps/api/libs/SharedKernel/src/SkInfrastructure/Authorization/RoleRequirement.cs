namespace SkInfrastructure.Authorization;

using Microsoft.AspNetCore.Authorization;

internal sealed class RoleRequirement(string role) : IAuthorizationRequirement
{
    public string Role { get; } = role;
}
