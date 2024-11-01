namespace Domain.Entities.Recruiters;

using SkDomain.Errors;

public static class RecruiterErrors
{
    public static readonly Error NotRecruitersFound = Error.NotFound(
        "Recruiters.NotRecruitersFound",
        "No recruites were found"
    );

    public static Error RecruiterNotFound(Guid recruiterId)
    {
        return Error.NotFound(
            "Recruiters.RecruiterNotFound",
            $"Recruiter with id {recruiterId} was not found"
        );
    }
}
