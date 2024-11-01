namespace Infrastructure.Maps.Pages;

using Domain.Pages.LandingInfos;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SkInfrastructure.Maps;

internal sealed class LandingInfoMap : BaseEntityMap<LandingInfo>
{
    public override void ConfigureEntity(EntityTypeBuilder<LandingInfo> builder)
    {
        _ = builder.Property(static x => x.BannerTitle).IsRequired();

        _ = builder.Property(static x => x.BannerDescription).IsRequired();

        _ = builder.Property(static x => x.BannerLogoUrl).HasMaxLength(255).IsRequired();

        _ = builder.Property(static x => x.InfoTitle).IsRequired();

        _ = builder.Property(static x => x.InfoDescription).IsRequired();
    }
}
