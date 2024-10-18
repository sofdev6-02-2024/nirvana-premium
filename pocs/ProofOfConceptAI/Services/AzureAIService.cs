using System.Text.Json;
using Azure;
using Azure.AI.Inference;

namespace ProofOfConceptAI.Services;

public class AzureAiService
{
    private readonly ChatCompletionsClient _client;
    private readonly string? _model;

    public AzureAiService(IConfiguration configuration)
    {

        var endpoint = new Uri(configuration["AzureAI:Endpoint"] ?? string.Empty);
        var credential = new AzureKeyCredential(configuration["AzureAI:ApiKey"] ?? throw new InvalidOperationException());
        _model = configuration["AzureAI:Model"];

        _client = new ChatCompletionsClient(
            endpoint,
            credential,
            new ChatCompletionsClientOptions());
    }

    public async Task<string> GetChatCompletion(string prompt, 
        string systemMessage = "You are a helpful assistant.", 
        float temperature = 0.7f, 
        int maxTokens = 500)
    {
        var requestOptions = new ChatCompletionsOptions()
        {
            Messages =
            {
                new ChatRequestSystemMessage(systemMessage),
                new ChatRequestUserMessage(prompt),
            },
            Model = _model,
            Temperature = temperature, // Dynamic temperature
            MaxTokens = maxTokens      // Dynamic token limit
        };

        Response<ChatCompletions> response = await _client.CompleteAsync(requestOptions);
        return response.Value.Choices[0].Message.Content;
    }


    public async Task StreamChatCompletion(string prompt, Action<string> onUpdate, 
        string systemMessage = "You are a helpful assistant.", 
        float temperature = 0.7f, int maxTokens = 500)
    {
        var requestOptions = new ChatCompletionsOptions()
        {
            Messages =
            {
                new ChatRequestSystemMessage(systemMessage),
                new ChatRequestUserMessage(prompt),
            },
            Model = _model,
            Temperature = temperature,
            MaxTokens = maxTokens,
        };

        StreamingResponse<StreamingChatCompletionsUpdate> response = await _client.CompleteStreamingAsync(requestOptions);

        await foreach (var chatUpdate in response)
        {
            if (!string.IsNullOrEmpty(chatUpdate.ContentUpdate))
            {
                onUpdate(chatUpdate.ContentUpdate);
            }
        }
    }


    public async Task<string> GetImageAnalysis(byte[] imageData, string prompt,
        string systemMessage = "You are a helpful assistant that describes images in details.")
    {
        ChatMessageContentItem[] userContent =
        [
            new ChatMessageTextContentItem(prompt),
            new ChatMessageImageContentItem(BinaryData.FromBytes(imageData), "image/jpeg", "low")
        ];

        var requestOptions = new ChatCompletionsOptions()
        {
            Messages =
            {
                new ChatRequestSystemMessage(systemMessage),
                new ChatRequestUserMessage(userContent),
            },
            Model = _model,
            Temperature = 1,
            MaxTokens = 1000,
        };

        Response<ChatCompletions> response = await _client.CompleteAsync(requestOptions);
        return response.Value.Choices[0].Message.Content;
    }

    public async Task<string> InvokeTool(string prompt, FunctionDefinition functionDefinition,
        Func<string, string, string> toolFunction, string systemMessage = "You are a helpful assistant.")
    {
        ChatCompletionsFunctionToolDefinition tool = new ChatCompletionsFunctionToolDefinition(functionDefinition);

        var requestOptions = new ChatCompletionsOptions()
        {
            Messages =
            {
                new ChatRequestSystemMessage(systemMessage),
                new ChatRequestUserMessage(prompt),
            },
            Model = _model,
            Tools = { tool }
        };

        Response<ChatCompletions> response = await _client.CompleteAsync(requestOptions);

        if (response.Value.Choices[0].FinishReason == "tool_calls")
        {
            requestOptions.Messages.Add(new ChatRequestAssistantMessage(response.Value.Choices[0].Message));

            if (response.Value.Choices[0].Message.ToolCalls.Count == 1)
            {
                var toolCall = response.Value.Choices[0].Message.ToolCalls[0] as ChatCompletionsFunctionToolCall;
                if (toolCall != null)
                {
                    var functionArgs = JsonSerializer.Deserialize<Dictionary<string, string>>(toolCall.Arguments);
                    if (functionArgs != null)
                    {
                        string functionReturn = toolFunction(functionArgs["param1"], functionArgs["param2"]);

                        requestOptions.Messages.Add(new ChatRequestToolMessage(
                            toolCallId: toolCall.Id,
                            content: functionReturn
                        ));
                    }

                    response = await _client.CompleteAsync(requestOptions);
                    return response.Value.Choices[0].Message.Content;
                }
            }
        }

        return "Unable to process the request.";
    }
}

