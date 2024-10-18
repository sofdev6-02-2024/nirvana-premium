using Microsoft.AspNetCore.Mvc;
using ProofOfConceptAI.Models;
using ProofOfConceptAI.Services;

namespace ProofOfConceptAI.Controllers;

[ApiController]
[Route("[controller]")]
public class CvReviewController(AzureAiService azureAiService) : ControllerBase
{
    [HttpPost]
    public async Task<IActionResult> ReviewCv([FromBody] CvReviewRequest request)
    {
        if (string.IsNullOrEmpty(request.CvContent))
        {
            return BadRequest("CV content is required.");
        }
        
        var jobTitle = string.IsNullOrEmpty(request.JobTitle) ? "No specific job title" : request.JobTitle;
        var industry = string.IsNullOrEmpty(request.Industry) ? "general" : request.Industry;
        var yearsOfExperience = request.YearsOfExperience?.ToString() ?? "No experience";


        string prompt = $"Please review the following CV and provide feedback on the following areas:\n" +
                        $"- Formatting\n" +
                        $"- Relevance to job title: {request.JobTitle}\n" +
                        $"- Skills\n" +
                        $"- Overall professionalism\n\n" +
                        $"CV Content: {request.CvContent}\n" +
                        $"Industry: {request.Industry}\n" +
                        $"Years of Experience: {request.YearsOfExperience}\n";


        string systemMessage = "You are an expert HR assistant specializing in CV reviews. " +
                               "Provide constructive feedback and suggestions for improvement.";
        
        string response = await azureAiService.GetChatCompletion(prompt, systemMessage);

        return Ok(new { Review = response });
    }
}
