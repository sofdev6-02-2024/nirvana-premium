namespace Domain.Enums;

using System.ComponentModel;

public enum JobModality
{
    [Description("Remote")]
    Remote = 0,

    [Description("On Site")]
    OnSite = 1,
}
