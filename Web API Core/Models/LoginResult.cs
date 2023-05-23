using System.Text.Json.Serialization;

namespace Web_API_Core.Models
{
    public class LoginResult
    {
        [JsonPropertyName("username")]
        public string UserName { get; set; }

        [JsonPropertyName("accessToken")]
        public string AccessToken { get; set; }

    }
}
