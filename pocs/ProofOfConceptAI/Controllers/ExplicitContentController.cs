using Microsoft.AspNetCore.Mvc;
using ProofOfConceptAI.Models;
using ProofOfConceptAI.Services;

namespace ProofOfConceptAI.Controllers;

[ApiController]
[Route("[controller]")]
public class ExplicitContentController : ControllerBase
{
    private readonly AzureAiService _azureAiService;

    public ExplicitContentController(AzureAiService azureAiService)
    {
        _azureAiService = azureAiService;
    }

    [HttpPost]
    public async Task<IActionResult> ReviewContent([FromBody] ExplicitContentRequest request)
    {
        if (string.IsNullOrEmpty(request.Content))
        {
            return BadRequest("Content is required.");
        }

        string contentType = request.ContentType ?? "profile";
        string context = request.Context ?? "general";

        string prompt = $"Please check the following {contentType} content for explicit or inappropriate material. " +
                        $"Content includes anything that could be offensive, sexual, violent, discriminatory, or against platform policies:\n\n" +
                        $"Content: {request.Content}\n" +
                        $"Context: {context}";

        string systemMessage = "You are an expert content moderator for a freelance platform. " +
                               "Identify explicit content and flag inappropriate material based on platform rules.";
        
        string response = await _azureAiService.GetChatCompletion(prompt, systemMessage);

        bool isExplicit = response.Contains("explicit", StringComparison.OrdinalIgnoreCase) || 
                          response.Contains("inappropriate", StringComparison.OrdinalIgnoreCase);

        return Ok(new { IsExplicit = isExplicit, Review = response });
    }
}