using Api.Gateway.Configurations;
using Api.Gateway.Extensions;
using Api.Gateway.Services;
using Ocelot.Cache.CacheManager;
using Ocelot.DependencyInjection;
using Ocelot.Middleware;
using Ocelot.Provider.Consul;
using Ocelot.Provider.Polly;
using Serilog;
using SkWeb.Api.Dependencies;
using SkWeb.Api.Extensions;

WebApplicationBuilder builder = WebApplication.CreateBuilder(args);

builder.Host.UseSerilogInternal();

builder.Services.AddExceptionHandlerInternal();

builder.Configuration.AddJsonFile(
    Constants.OcelotConfiguration,
    optional: false,
    reloadOnChange: true
);

builder
    .Services.AddOcelot(builder.Configuration)
    .AddConsul<MyConsulServiceBuilder>()
    .AddCacheManager(static x => x.WithDictionaryHandle())
    .AddPolly();

builder.Services.AddSwaggerForOcelot(builder.Configuration);

builder.Services.AddCorsInternal();

builder.Services.AddEndpointsApiExplorer();

WebApplication app = builder.Build();

if (app.Environment.IsDevelopment() || app.Environment.IsStaging())
{
    _ = app.UseSwagger();
    _ = app.UseSwaggerForOcelotUI(static options =>
    {
        options.PathToSwaggerGenerator = Constants.SwaggerDocs;
        options.ReConfigureUpstreamSwaggerJson = AlterUpstream.AlterUpstreamSwaggerJson;
    });
}

app.UseCors();

app.UseRequestContextLogging();

app.UseSerilogRequestLogging();

app.UseExceptionHandler();

await app.UseOcelot();

await app.RunAsync();
