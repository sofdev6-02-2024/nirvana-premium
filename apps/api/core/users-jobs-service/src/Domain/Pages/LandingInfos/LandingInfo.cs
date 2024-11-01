namespace Domain.Pages.LandingInfos;

using SkDomain.Entities;

public sealed class LandingInfo : BaseEntity
{
    public required string BannerTitle { get; set; }
    public required string BannerDescription { get; set; }
    public required Uri BannerLogoUrl { get; set; }

    public required string InfoTitle { get; set; }
    public required string InfoDescription { get; set; }
}
