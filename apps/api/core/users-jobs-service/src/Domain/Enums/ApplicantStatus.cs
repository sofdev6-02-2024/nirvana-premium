namespace Domain.Enums;

using System.ComponentModel;

public enum ApplicantStatus
{
    [Description("Published")]
    Published = 0,

    [Description("Viewed")]
    Viewed = 1,

    [Description("Accepted")]
    Accepted = 2,

    [Description("Rejected")]
    Rejected = 3,
}
