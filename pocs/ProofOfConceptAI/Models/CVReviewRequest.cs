
namespace ProofOfConceptAI.Models;

public class CvReviewRequest
{
    public required string CvContent { get; set; }
    public string? JobTitle { get; set; }
    public string? Industry { get; set; }
    public int? YearsOfExperience { get; set; }
    public string? CvFormat { get; set; } 
    public string[]? Skills { get; set; } 
    public string? Language { get; set; } // English, Spanish, etc.
}
