using BusinessCore.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Web_API_Core.Models;

namespace Web_API_Core.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly ILogger<AccountController> _logger;
        private readonly IUserService _userService;
        private readonly IConfiguration _configuration;
        private readonly IRSAHelper _rsaHelper;
        public AccountController(ILogger<AccountController> logger, IUserService userService, IConfiguration configuration, IRSAHelper rsaHelper)
        {
            _logger = logger;
            _userService = userService;
            _configuration = configuration;
            _rsaHelper = rsaHelper;
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] RSALoginRequest request)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            var userJson = _rsaHelper.Decrypt(request.Data);
            var user = Newtonsoft.Json.JsonConvert.DeserializeObject<LoginRequest>(userJson);
            if (!_userService.IsValidUserCredentials(user.UserName, user.Password))
            {
                return Unauthorized();
            }
           
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_configuration["JWT:Secret"]);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                     new Claim(System.Security.Claims.ClaimTypes.Name,user.UserName),
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);

            _logger.LogInformation($"User [{user.UserName}] logged in the system.");
            return Ok(new LoginResult
            {
                UserName = user.UserName,
                AccessToken = tokenString,
            });
        }

        [Authorize]
        [HttpGet]
        public async Task<IActionResult> Test()
        {
            return Ok();
        }
    }
}