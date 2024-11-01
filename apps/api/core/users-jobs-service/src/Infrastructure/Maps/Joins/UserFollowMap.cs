namespace Infrastructure.Maps.Joins;

using Domain.Joins.UserFollows;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SkInfrastructure.Maps;

internal sealed class UserFollowMap : BaseRegisterMap<UserFollow>
{
    public override void ConfigureEntity(EntityTypeBuilder<UserFollow> builder) { }
}
