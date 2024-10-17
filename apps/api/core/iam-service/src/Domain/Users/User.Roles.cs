namespace Domain.Users;

using System.ComponentModel;

public enum UserRole
{
    [Description("Applicant")]
    Applicant = 0,

    [Description("Recruiter")]
    Recruiter = 1,

    [Description("Admin")]
    Admin = 2,
}
