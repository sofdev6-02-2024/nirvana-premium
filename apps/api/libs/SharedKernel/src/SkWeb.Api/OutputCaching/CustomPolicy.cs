namespace SkWeb.Api.OutputCaching;

using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.OutputCaching;
using Microsoft.Extensions.Primitives;

internal sealed class CustomPolicy : IOutputCachePolicy
{
    public CustomPolicy() { }

#nullable disable
    ValueTask IOutputCachePolicy.CacheRequestAsync(
        OutputCacheContext context,
        CancellationToken cancellation
    )
    {
        bool flag = AttemptOutputCaching(context);
        context.EnableOutputCaching = true;
        context.AllowCacheLookup = flag;
        context.AllowCacheStorage = flag;
        context.AllowLocking = true;
        context.CacheVaryByRules.QueryKeys = (StringValues)"*";
        return ValueTask.CompletedTask;
    }

    ValueTask IOutputCachePolicy.ServeFromCacheAsync(
        OutputCacheContext context,
        CancellationToken cancellation
    )
    {
        return ValueTask.CompletedTask;
    }

    ValueTask IOutputCachePolicy.ServeResponseAsync(
        OutputCacheContext context,
        CancellationToken cancellation
    )
    {
        HttpResponse response = context.HttpContext.Response;
        if (!StringValues.IsNullOrEmpty(response.Headers.SetCookie))
        {
            context.AllowCacheStorage = false;
            return ValueTask.CompletedTask;
        }
        if (response.StatusCode == 200)
            return ValueTask.CompletedTask;
        context.AllowCacheStorage = false;
        return ValueTask.CompletedTask;
    }

    private static bool AttemptOutputCaching(OutputCacheContext context)
    {
        HttpRequest request = context.HttpContext.Request;

        if (!HttpMethods.IsGet(request.Method) && !HttpMethods.IsHead(request.Method))
            return false;

        return true;
    }
}
