namespace SkWeb.Api.Extensions;

using Microsoft.EntityFrameworkCore;
using SkInfrastructure.Persistent;

public static class MigrationExtensions
{
    public static async Task ApplyMigrations<T>(
        this IApplicationBuilder app,
        IConfiguration configuration
    )
        where T : BaseApplicationDbContext
    {
        bool applyMigrations = configuration.GetValue<bool>("ApplyMigrations");

        if (!applyMigrations)
        {
            return;
        }

        using IServiceScope scope = app.ApplicationServices.CreateScope();

        await using T dbContext = scope.ServiceProvider.GetRequiredService<T>();

        await dbContext.Database.MigrateAsync();

        await dbContext.SeedDataAsync(scope);
    }
}
