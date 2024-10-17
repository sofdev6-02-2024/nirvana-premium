namespace SkWeb.Api.Extensions;

using HealthChecks.UI.Client;
using Microsoft.AspNetCore.Diagnostics.HealthChecks;

public static class ApplicationBuilderExtensions
{
    public static IApplicationBuilder UseSwaggerWithUi(this WebApplication app)
    {
        return app.UseSwagger().UseSwaggerUI();
    }

    public static IApplicationBuilder UseHealthChecksInternal(this WebApplication app)
    {
        _ = app.MapHealthChecks(
            "/health",
            new HealthCheckOptions { ResponseWriter = UIResponseWriter.WriteHealthCheckUIResponse }
        );

        return app;
    }
}
