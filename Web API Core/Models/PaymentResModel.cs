namespace Web_API_Core.Models
{
    public class PaymentResModel : BaseModel
    {
        public int ResponseCode { get; set; }
        public int ApprovalCode { get; set; }
        public DateTime DateTime { get; set; }

    }
}
