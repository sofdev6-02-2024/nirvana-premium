namespace Domain.Enums;

using System.ComponentModel;

public enum DeveloperModality
{
    [Description("Remote")]
    Remote = 0,

    [Description("On Site")]
    OnSite = 1,

    [Description("Hybrid")]
    Hybrid = 2,
}
