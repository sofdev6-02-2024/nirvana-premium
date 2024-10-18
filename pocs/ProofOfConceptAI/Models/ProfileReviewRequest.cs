
namespace ProofOfConceptAI.Models;

public class ProfileReviewRequest
{
    public required string ProfileContent { get; init; }
    public string? Platform { get; init; }
    public string? Industry { get; init; }
    public string? CareerGoals { get; init; }
    public string[]? Skills { get; set; } 
}
