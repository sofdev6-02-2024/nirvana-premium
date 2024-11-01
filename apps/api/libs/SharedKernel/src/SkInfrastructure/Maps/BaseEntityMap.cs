namespace SkInfrastructure.Maps;

using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SkDomain.Entities;

public abstract class BaseEntityMap<TEntity> : BaseRegisterMap<TEntity>
    where TEntity : BaseEntity
{
    public override void Configure(EntityTypeBuilder<TEntity> builder)
    {
        _ = builder.HasKey(static e => e.Id);

        base.Configure(builder);
    }
}
