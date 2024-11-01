namespace Infrastructure.Maps.Joins;

using Domain.Joins.UserReviews;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SkInfrastructure.Maps;

internal sealed class UserReviewMap : BaseRegisterMap<UserReview>
{
    public override void ConfigureEntity(EntityTypeBuilder<UserReview> builder)
    {
        _ = builder.Property(static x => x.Rating).IsRequired();

        _ = builder
            .Property(static x => x.Comment)
            .HasMaxLength(500)
            .HasDefaultValue(null)
            .ValueGeneratedOnAdd();
    }
}
