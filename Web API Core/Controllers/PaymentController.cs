using AutoMapper;
using BusinessCore.Domain;
using BusinessCore.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Web_API_Core.Models;

namespace Web_API_Core.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentController : ControllerBase
    {
      
        [Authorize]
        [HttpPost("SavePayment")]
        public async Task<IActionResult> SavePayment([FromBody] PaymentModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }            

            return Ok(new PaymentResModel
            {
                ApprovalCode = 123123,
                ResponseCode = 0,
                Message="Success",
                DateTime= "202102261200"

            });
        }
    }
}
