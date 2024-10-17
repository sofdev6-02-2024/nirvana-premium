using System.Reflection;
using Application;
using Iam.Service.Api;
using Infrastructure;
using Infrastructure.Persistent;
using Serilog;
using SkWeb.Api.Extensions;
using SkWeb.Api.Infrastructure;
using SkWeb.Api.ServiceDiscovery;

WebApplicationBuilder builder = WebApplication.CreateBuilder(args);

builder.Services.AddConsulInternal(builder.Configuration.GetServiceConfig());

EnvLoader.Load(builder.Configuration);

builder.Host.UseSerilogInternal();

builder.Services.AddSwaggerGenWithOutAuth(
    title: "IAM Service API",
    description: "This API is responsible for handling authentication, including login, registration, and JWT management for other microservices in the system. It provides endpoints for user authentication, user registration, and token generation/validation to ensure secure communication between microservices.",
    version: "v1"
);

builder.Services.AddApplication().AddPresentation().AddInfrastructure(builder.Configuration);

builder.Services.AddEndpoints(Assembly.GetExecutingAssembly());

WebApplication app = builder.Build();

app.MapEndpoints();

if (app.Environment.IsDevelopment() || app.Environment.IsStaging())
{
    _ = app.UseSwaggerWithUi();

    await app.ApplyMigrations<ApplicationDbContext>(builder.Configuration);
}

app.UseHealthChecksInternal();

app.UseRequestContextLogging();

app.UseSerilogRequestLogging();

app.UseExceptionHandler();

await app.RunAsync();
