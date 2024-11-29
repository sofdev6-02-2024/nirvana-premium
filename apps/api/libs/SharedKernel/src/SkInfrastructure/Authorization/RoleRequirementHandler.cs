namespace SkInfrastructure.Authorization;

using System.Security.Claims;
using System.Text.Json;
using Microsoft.AspNetCore.Authorization;

internal sealed class RoleRequirementHandler : AuthorizationHandler<RoleRequirement>
{
    protected override Task HandleRequirementAsync(
        AuthorizationHandlerContext context,
        RoleRequirement requirement
    )
    {
        Claim? metadataClaim = context.User.Claims.FirstOrDefault(c => c.Type == "metadata");

        if (metadataClaim is null)
            return Task.CompletedTask;

        JsonDocument metadata = JsonDocument.Parse(metadataClaim.Value);

        if (
            metadata.RootElement.TryGetProperty("role", out JsonElement roleProperty)
            && roleProperty
                .GetString()!
                .Equals(requirement.Role, StringComparison.OrdinalIgnoreCase)
        )
        {
            context.Succeed(requirement);
        }

        return Task.CompletedTask;
    }
}
