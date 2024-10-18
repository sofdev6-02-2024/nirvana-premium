namespace ProofOfConceptAI.Models;

public class ExplicitContentRequest
{
    public required string Content { get; set; }
    public string? ContentType { get; set; } // Can be "profile" or "job post"
    public string? Context { get; set; }     // Optional context to guide AI
}
