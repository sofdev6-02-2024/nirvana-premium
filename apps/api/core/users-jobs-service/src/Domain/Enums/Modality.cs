namespace Domain.Enums;

using System.ComponentModel;

public enum Modality
{
    [Description("Remote")]
    Virtual = 0,

    [Description("On Site")]
    OnSite = 1,

    [Description("Hybrid")]
    Hybrid = 2,
}
