namespace SkInfrastructure.Dependencies;

using Configurations;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using SkApplication.Persistent;

public static partial class DependencyInjection
{
    public static IServiceCollection AddDatabase<TIDbContext, TDbContext>(
        this IServiceCollection services,
        IConfiguration configuration
    )
        where TIDbContext : class, IBaseApplicationDbContext
        where TDbContext : DbContext, TIDbContext
    {
        string? connectionString = configuration.GetConnectionString(Constants.ConnectionString)!;

        _ = services.AddDbContext<TDbContext>(options =>
            options
                .UseNpgsql(
                    connectionString,
                    npgsqlOptions =>
                        npgsqlOptions.MigrationsHistoryTable(
                            HistoryRepository.DefaultTableName,
                            Constants.DefaultSchema
                        )
                )
                .UseSnakeCaseNamingConvention()
        );

        _ = services.AddScoped<TIDbContext>(sp => sp.GetRequiredService<TDbContext>());

        return services;
    }
}
