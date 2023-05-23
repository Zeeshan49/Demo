using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Web_API_Core.Models
{

    public class EncryptLoginRequest
    {
        public string Data { get; set; }
        public string AESKey { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
    }
    public class LoginRequest
    {

        [Required]
        [JsonPropertyName("username")]
        public string UserName { get; set; }

        [Required]
        [JsonPropertyName("password")]
        public string Password { get; set; }
    }
}
