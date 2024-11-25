namespace Domain.Entities.Recruiters;

using SkDomain.Errors;

public static class RecruiterErrors
{
    public static readonly Error NotRecruitersFound = Error.NotFound(
        "Recruiters.NotRecruitersFound",
        "No recruiters were found"
    );

    public static Error RecruiterNotFound(Guid recruiterId)
    {
        return Error.NotFound(
            "Recruiters.RecruiterNotFound",
            $"Recruiter with id {recruiterId} was not found"
        );
    }

    public static Error RepeatedName(string name)
    {
        return Error.Conflict(
            "Recruiters.RepeatedName",
            $"Recruiter with name {name} already exists"
        );
    }
}
