namespace Domain.Recruiters;

using SkDomain.Errors;

public static class RecruiterErrors
{
    public static Error RecruiterNotFound(Guid recruiterId)
    {
        return Error.NotFound(
            "Recruiters.RecruiterNotFound",
            $"Recruiter with id {recruiterId} was not found"
        );
    }
}
