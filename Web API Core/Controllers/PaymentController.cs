using AutoMapper;
using BusinessCore.Domain;
using BusinessCore.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Org.BouncyCastle.Asn1.Ocsp;
using Web_API_Core.Models;

namespace Web_API_Core.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentController : ControllerBase
    {
        private readonly IAESHelper _aesHelper;
        public PaymentController(IAESHelper aesHelper)
        {
            _aesHelper = aesHelper;
        }

        [Authorize]
        [HttpPost("SavePayment")]
        public async Task<IActionResult> SavePayment([FromBody] EncryptedPaymentModel encryptedModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            //AES
            var paymentJson = _aesHelper.Decrypt(encryptedModel.Data, encryptedModel.AESKey.Trim());
            var obj = Newtonsoft.Json.JsonConvert.DeserializeObject<PaymentModel>(paymentJson);
            //END

            return Ok(new PaymentResModel
            {
                ApprovalCode = 123123,
                ResponseCode = 0,
                Message = "Success",
                DateTime = "202102261200"

            });
        }
    }
}
