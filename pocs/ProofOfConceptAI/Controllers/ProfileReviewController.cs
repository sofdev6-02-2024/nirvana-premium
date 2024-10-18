using Microsoft.AspNetCore.Mvc;
using ProofOfConceptAI.Models;
using ProofOfConceptAI.Services;

namespace ProofOfConceptAI.Controllers;


[ApiController]
[Route("[controller]")]
public class ProfileReviewController : ControllerBase
{
    private readonly AzureAiService _azureAiService;

    public ProfileReviewController(AzureAiService azureAiService)
    {
        _azureAiService = azureAiService;
    }

    [HttpPost]
    public async Task<IActionResult> ReviewProfile([FromBody] ProfileReviewRequest request)
    {
        if (string.IsNullOrEmpty(request.ProfileContent))
        {
            return BadRequest("Profile content is required.");
        }

        string prompt = $"Please review the following professional profile and provide feedback on the following areas:\n" +
                        $"- Clarity of career goals\n" +
                        $"- Relevance of skills to industry: {request.Industry}\n" +
                        $"- Completeness of the profile\n" +
                        $"- Suggestions for improving the profile\n\n" +
                        $"Profile Content: {request.ProfileContent}\n" +
                        $"Platform: {request.Platform}\n" +
                        $"Career Goals: {request.CareerGoals}";


        string systemMessage = "You are an expert career coach specializing in professional profile reviews. " +
                               "Provide constructive feedback and suggestions for improvement.";
        
        string response = await _azureAiService.GetChatCompletion(prompt, systemMessage);

        return Ok(new { Review = response });
    }
}
