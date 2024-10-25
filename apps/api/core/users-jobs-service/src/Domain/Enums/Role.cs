namespace Domain.Enums;

using System.ComponentModel;

public enum Role
{
    [Description("Developer")]
    Developer = 0,

    [Description("Recruiter")]
    Recruiter = 1,

    [Description("Company")]
    Company,
}
