namespace SkWeb.Api.Infrastructure;

using Configurations;
using DotNetEnv;

public static class EnvLoader
{
    public static void Load(IConfiguration configuration)
    {
        _ = Env.Load(
            Path.Combine(Directory.GetCurrentDirectory(), configuration[Constants.EnvPath]!)
        );
    }
}
