namespace SkWeb.Api.Extensions;

using Middleware;

public static class MiddlewareExtensions
{
    public static IApplicationBuilder UseRequestContextLogging(this IApplicationBuilder app)
    {
        return app.UseMiddleware<RequestContextLoggingMiddleware>();
    }
}
