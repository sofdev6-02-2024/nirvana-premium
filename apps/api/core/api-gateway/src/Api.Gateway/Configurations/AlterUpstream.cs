namespace Api.Gateway.Configurations;

using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

public static class AlterUpstream
{
    public static string AlterUpstreamSwaggerJson(HttpContext _, string swaggerJson)
    {
        JObject swagger = JObject.Parse(swaggerJson);

        return swagger.ToString(Formatting.Indented);
    }
}
