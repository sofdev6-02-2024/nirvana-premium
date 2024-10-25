namespace Domain.Enums;

using System.ComponentModel;

public enum Schedule
{
    [Description("Full Time")]
    FullTime = 0,

    [Description("Part Time")]
    PartTime = 1,
}
