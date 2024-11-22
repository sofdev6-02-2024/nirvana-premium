namespace Infrastructure.Maps.Entities;

using Domain.Entities.Developers;
using Domain.Entities.Recruiters;
using Domain.Entities.Users;
using Domain.Joins.UserFollows;
using Domain.Joins.UserReviews;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SkInfrastructure.Maps;

internal sealed class UserMap : BaseEntityMap<User>
{
    public override void ConfigureEntity(EntityTypeBuilder<User> builder)
    {
        _ = builder.HasIndex(static u => u.Email).IsUnique();
        _ = builder.Property(static u => u.Email).HasMaxLength(255).IsRequired();

        _ = builder.HasIndex(static u => u.IdentityId).IsUnique();
        _ = builder.Property(static u => u.IdentityId).IsRequired();

        _ = builder.Property(static u => u.Role).HasConversion<int>().IsRequired();

        _ = builder.Property(static u => u.DoOnboarding).IsRequired();

        _ = builder
            .HasOne(static u => u.Recruiter)
            .WithOne(static r => r.User)
            .HasForeignKey<Recruiter>(static r => r.UserId)
            .IsRequired();

        _ = builder
            .HasOne(static u => u.Developer)
            .WithOne(static d => d.User)
            .HasForeignKey<Developer>(static d => d.UserId)
            .IsRequired();

        _ = builder
            .HasMany(static u => u.Followers)
            .WithMany(static uf => uf.Follows)
            .UsingEntity<UserFollow>(
                static luf =>
                    luf.HasOne(static u => u.UserFollower)
                        .WithMany(static uf => uf.UserFollowers)
                        .HasForeignKey(static u => u.UserFollowerId)
                        .IsRequired(),
                static ruf =>
                    ruf.HasOne(static u => u.UserFollowed)
                        .WithMany(static uf => uf.UserFollows)
                        .HasForeignKey(static u => u.UserFollowedId)
                        .IsRequired()
            );

        _ = builder
            .HasMany(static ur => ur.ReviewsFrom)
            .WithMany(static urf => urf.Reviews)
            .UsingEntity<UserReview>(
                static lur =>
                    lur.HasOne(static ur => ur.UserReviewer)
                        .WithMany(static u => u.UserReviewsFrom)
                        .HasForeignKey(static ur => ur.UserReviewerId)
                        .IsRequired(),
                static rur =>
                    rur.HasOne(static ur => ur.UserReviewed)
                        .WithMany(static u => u.UserReviews)
                        .HasForeignKey(static ur => ur.UserReviewedId)
                        .IsRequired()
            );
    }
}
