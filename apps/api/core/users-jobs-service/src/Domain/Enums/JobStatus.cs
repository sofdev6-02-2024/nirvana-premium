namespace Domain.Enums;

using System.ComponentModel;

public enum JobStatus
{
    [Description("Open")]
    Open = 0,

    [Description("In Progress")]
    InProgress = 1,

    [Description("For Review")]
    ForReview = 2,

    [Description("Done")]
    Done = 3,
}
