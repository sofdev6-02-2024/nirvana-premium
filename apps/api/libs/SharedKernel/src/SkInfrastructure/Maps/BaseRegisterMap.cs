namespace SkInfrastructure.Maps;

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SkDomain.Entities;

public abstract class BaseRegisterMap<TEntity> : IEntityTypeConfiguration<TEntity>
    where TEntity : BaseRegister
{
    public abstract void ConfigureEntity(EntityTypeBuilder<TEntity> builder);

    public virtual void Configure(EntityTypeBuilder<TEntity> builder)
    {
        _ = builder
            .Property(static e => e.CreatedAt)
            .HasColumnType("timestamptz")
            .HasDefaultValueSql("CURRENT_TIMESTAMP")
            .ValueGeneratedOnAdd();

        _ = builder
            .Property(static e => e.UpdatedAt)
            .HasColumnType("timestamptz")
            .HasDefaultValueSql("CURRENT_TIMESTAMP")
            .ValueGeneratedOnAddOrUpdate();

        _ = builder.Property(static e => e.IsActive).HasDefaultValue(true).ValueGeneratedOnAdd();

        ConfigureEntity(builder);
    }
}
