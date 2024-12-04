using System.Reflection;
using Application;
using Infrastructure;
using Infrastructure.Persistent;
using Serilog;
using SkWeb.Api.Extensions;
using SkWeb.Api.ServiceDiscovery;
using Users.Jobs.Service.Api;

WebApplicationBuilder builder = WebApplication.CreateBuilder(args);

builder.Host.UseSerilogInternal();

builder.Services.AddSwaggerGenWithAuth(
    title: "Users Jobs Service API",
    description: "This API manages the core business logic for user management and job postings. It serves as the central hub for applicants and recruiters, focusing on freelancers and software development solutions.",
    version: "v1"
);

builder.Services.AddApplication().AddPresentation().AddInfrastructure(builder.Configuration);

builder.Services.AddEndpoints(Assembly.GetExecutingAssembly());

builder.Services.AddRedisCache(builder.Configuration);

if (builder.Environment.IsStaging())
{
    builder.Services.AddConsulInternal(builder.Configuration.GetServiceConfig());
}

WebApplication app = builder.Build();

app.MapEndpoints();

if (app.Environment.IsDevelopment() || app.Environment.IsStaging())
{
    _ = app.UseSwaggerWithUi();
}

await app.ApplyMigrations<ApplicationDbContext>(builder.Configuration);

if (app.Environment.IsProduction())
{
    app.UseSwaggerWithUi();
    app.UseHttpsRedirection();
}

app.UseHealthChecksInternal();

app.UseRequestContextLogging();

app.UseSerilogRequestLogging();

app.UseExceptionHandler();

app.UseOutputCache();

app.UseAuthentication();

app.UseAuthorization();

await app.RunAsync();
