using System.Reflection;
using Application.Configurations;
using DotNetEnv;
using HealthChecks.UI.Client;
using Infrastructure.Configurations;
using Microsoft.AspNetCore.Diagnostics.HealthChecks;
using Serilog;
using Web.Api;
using Web.Api.Extensions;

WebApplicationBuilder builder = WebApplication.CreateBuilder(args);

Env.Load(
    Path.Combine(
        Directory.GetCurrentDirectory(),
        builder.Configuration[Web.Api.Configurations.Constants.EnvPath]!
    )
);

builder.Host.UseSerilog(
    (context, loggerConfig) => loggerConfig.ReadFrom.Configuration(context.Configuration)
);

builder.Services.AddCustomCors();

builder.Services.AddSwaggerGenWithAuth();

builder.Services.AddApplication().AddPresentation().AddInfrastructure(builder.Configuration);

builder.Services.AddEndpoints(Assembly.GetExecutingAssembly());

WebApplication app = builder.Build();

app.MapEndpoints();

if (app.Environment.IsDevelopment() || app.Environment.IsStaging())
{
    app.UseSwaggerWithUi();

    app.ApplyMigrations();
}

app.MapHealthChecks(
    "health",
    new HealthCheckOptions { ResponseWriter = UIResponseWriter.WriteHealthCheckUIResponse }
);

app.UseRequestContextLogging();

app.UseSerilogRequestLogging();

app.UseExceptionHandler();

app.UseCors();

app.UseAuthentication();

app.UseAuthorization();

await app.RunAsync();
